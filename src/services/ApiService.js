class ApiService {
  constructor(){
    this.baseUrl = 'https://murmuring-scrubland-16064.herokuapp.com'
  }

  setToken(token) {
    this.token = token 
  }

  styles() {
    const url = `${this.baseUrl}/styles.json`
    return fetch(url)
     .then( response => response.json() )  
  }  

  createStyle(data) {
    const request = this.requestObject(data)
    request.headers.Authorization = this.token

    const url = `${this.baseUrl}/styles.json`

    return fetch(url, request)
    .then( this.ensureSuccess )
    .then( response => response.json() )
  }  

  login(data) {
    let request = this.requestObject(data)

    const url = `${this.baseUrl}/login_api`

    return fetch(url, request)
     .then( this.ensureSuccess )
     .then( response => response.json() )    
  }

  requestObject(data){
    let request = {
      method: 'POST', 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return request
  }

  ensureSuccess(response) { 
    if (response.status == 200 || response.status == 201) {  
      return Promise.resolve(response)  
    } else {  
      return response.json().then( data => Promise.reject(data) ) 
    }  
  }

  static instance() {
    if ( this.object==null) {
      this.object = new ApiService()
    }
    return this.object;
  }

}


export default ApiService;