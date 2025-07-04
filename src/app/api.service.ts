import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseClass } from '../shared/BaseClass';
import { ConfigService } from '../assets/config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends  BaseClass {

  cognitoUrl = "https://cognito-idp.ap-south-1.amazonaws.com/"

  constructor(private http: HttpClient , private configService: ConfigService) {
    super();
  }
   
    signup( username: string, password: string) {
    let clientId = this.configService.get('cognitoClientId')
    let  clientSecret =  this.configService.get('cognitoClientSecret')
    let   secretHash  = this.generateSecretHash(username , clientId , clientSecret )
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

}
