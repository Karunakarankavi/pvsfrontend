import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseClass } from '../shared/BaseClass';
import { ConfigService } from '../assets/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseClass {

  cognitoUrl = "https://cognito-idp.ap-south-1.amazonaws.com/"

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
  }




  signin(username: string, password: string) {
    let clientId = this.configService.get('cognitoClientId')
    let clientSecret = this.configService.get('cognitoClientSecret')
    let secretHash = this.generateSecretHash(username, clientId, clientSecret)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth'
    });
    const body = {
      "AuthFlow": "USER_PASSWORD_AUTH",
      "ClientId": clientId,
      "AuthParameters": {
        "USERNAME": username,
        "PASSWORD": password,
        "SECRET_HASH": secretHash
      }
    }

    return this.http.post(this.cognitoUrl, body, { headers });
  }

  signup(username: string, password: string) {
    let clientId = this.configService.get('cognitoClientId')
    let clientSecret = this.configService.get('cognitoClientSecret')
    let secretHash = this.generateSecretHash(username, clientId, clientSecret)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp'
    });
    const body = {
      ClientId: clientId,
      Username: username,
      Password: password,
      SecretHash: secretHash,
      UserAttributes: [
        {
          Name: 'email',
          Value: username
        }
      ]
    };

    return this.http.post(this.cognitoUrl, body, { headers });
  }


  verify(username: string, code: string) {
    let clientId = this.configService.get('cognitoClientId')
    let clientSecret = this.configService.get('cognitoClientSecret')
    let secretHash = this.generateSecretHash(username, clientId, clientSecret)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp'
    });
    const body = {
      ClientId: clientId,
      Username: username,
      SecretHash: secretHash,
      ConfirmationCode: code,

    };

    return this.http.post(this.cognitoUrl, body, { headers });
  }

  saveUser(body: any) {
     let baseUrl = this.configService.get("backendUrl")
    const token = window.sessionStorage.getItem("accessToken")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    return this.http.post(baseUrl + "saveuser", body, { headers });

  }

 getAvailableRooms(startDate: string, endDate: string) {
  const baseUrl = this.configService.get("backendUrl");
  const token = window.sessionStorage.getItem("accessToken");
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const url = `${baseUrl}rooms/available?checkIn=${startDate}&checkOut=${endDate}`;
  
  const body = {}; // or provide a body if needed

  return this.http.get(url ,{ headers });
}


}
