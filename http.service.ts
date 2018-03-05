'use strict'

import { Injectable } from '@angular/core'
import { Http, Headers, Request, Response, RequestMethod } from '@angular/http'
import { Observable, Observer } from 'rxjs'
// import { Router } from '@angular/router'
// const isJson = require('is-json')

// import { Log, Level } from 'ng2-logger/ng2-logger'
// const log = Log.create('XHRService')
// log.color = 'crimson'
// log.fixedWidth = 30

const HEADERS = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded'
})

@Injectable()
export class HttpService {
  
  env: string
  host: string
  type: string
  api: string
  data: any
  callback: Function = undefined

  constructor(
    private http: Http,
    // private router: Router
  ) {
    // log.d('constructor')
    this.host = window.location.host + ':8080'
  }

  get(api: string, data?: any): Observable<any> {
    // log.d('get')

    data = data || {}

    const url = `http://${this.host}/${api}/`

    const search = this.getBody(data)

    let options = {
      url: url,
      body: '',
      search: search,
      method: RequestMethod.Get
    }

    this.api = api

    return this.execute(options)
  }

  post(api: string, data?: any) {
    // log.d('post')

    data = data || {}

    const body = this.getBody(data)

    let options = {
      url: `http://${this.host}/${api}/`,
      body: body,
      method: RequestMethod.Post
    }

    this.api = api

    return this.execute(options)
  }

  put(api: string, data?: any) {
    // log.d('put')

    data = data || {}

    const body = this.getBody(data)

    let options = {
      url: `http://${this.host}/${api}/`,
      body: body,
      method: RequestMethod.Put
    }

    this.api = api

    return this.execute(options)
  }

  delete(api: string, data?: any) {
    // log.d('delete')

    data = data || {}

    const body = this.getBody(data)

    let options = {
      url: `http://${this.host}/${api}/`,
      body: body,
      method: RequestMethod.Delete
    }

    this.api = api

    return this.execute(options)
  }

  external(path, api?: boolean) {
    api = typeof api === 'undefined' ? false : api
    let url = ''

    if (api) {
      url = `http://${this.host}/${path}/`
    } else {
      url = path
    }

    window.location.href = url;
  }

  private getBody(data) {
    let body = ''

    if (_.isEmpty(data)) {
      return body
    }

    let bodyTmp = []

    for (let i in data) {
      if (!!data[i]) {
        let queryItem = i + '=' + data[i]
        bodyTmp.push(queryItem)
      }
    }

    if (bodyTmp.length) {
      body = bodyTmp.join('&')
    }

    return body
  }

  private extractData(response: Response): Observable<any> {
    // log.d('extractData()', Object.assign({}, response))

    let responseParsed: any = Object.assign({}, response)
    responseParsed.data = this.parseData(responseParsed)

    // if (responseParsed.status === 401) {
    //   this.router.navigateByUrl('/logout')
    // }

    return responseParsed
  }

  private handleError(response: Response): Observable<any> {
    // log.d('handleError()', Object.assign({}, response))

    let responseParsed: any = Object.assign({}, response)
    responseParsed.data = this.parseData(responseParsed)
    
    if (responseParsed.status === 0) {
      responseParsed.status = 400
      responseParsed.data = {error: 'connection error'}
    }

    // if (responseParsed.status === 401) {
    //   this.router.navigateByUrl('/logout')
    // }

    return Observable.create(observer => observer.next(responseParsed))
  }

  private parseData(response) {
    let data: any
    
    if (response.hasOwnProperty('_body')) {
      try {
        data = JSON.parse(response._body)
      } catch (error) {
        data = {
          error: response._body
        }
      }
    }
    return data
  }

  private execute(options: any): Observable<any> {
    options.headers = HEADERS
    options.withCredentials = true

    // log.i('execute()', options)

    return this.http
      .request(new Request(options))
      .map(response => {return this.extractData(response)})
      .catch(error => {return this.handleError(error)})
  }
}