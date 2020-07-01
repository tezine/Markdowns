import { Component, OnInit } from '@angular/core';
import {Defines} from '../../codes/defines';
import {EUser} from '../../entities/euser';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {GlobalsService} from '../../codes/globals.service';

@Component({
  selector: Defines.routeUsers,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  selectedUser=<EUser>{id:0};
  users?:EUser[];
  showModal=false;
  loading=false;
  searchTxt='';
  currentPage=1;
  pagingEnabled=true;

  constructor(private httpClient:HttpClient,protected router: Router, private globals:GlobalsService) {
  }

  async ngOnInit(){
    this.users=await this.getUsers();
  }

  async getUsers(){
    if(this.pagingEnabled) return await this.httpClient.get<EUser[]>(Defines.mockAPIBaseUrl+'/user?page='+this.currentPage+'&limit='+this.globals.pageSize).toPromise();
    else return await this.httpClient.get<EUser[]>(Defines.mockAPIBaseUrl+'/user').toPromise();
  }

  onBtnAddClicked(){
    this.selectedUser=<EUser>{id:0};
    this.showModal=true;
  }

  onBtnEditClicked(user:EUser){
    this.selectedUser=user;
    this.showModal=true;
  }

  async onBtnPreviousClicked(){
    this.pagingEnabled=true;
    if(this.currentPage==1)return;
    this.currentPage--;
    this.users=await this.getUsers();
  }

  async onBtnNextClicked(){
    this.currentPage++;
    this.pagingEnabled=true;
    this.users=await this.getUsers();
  }

  async onbtnSkillsClicked(user:EUser){
    Defines.selectedUserID=user.id;
    await this.router.navigate([Defines.routeSkills]);
  }

  async onBtnSaveClicked(){
    this.showModal=false;
    let result:EUser;
    this.loading=true;
    if(this.selectedUser.id==0) result=await this.httpClient.post<EUser>(Defines.mockAPIBaseUrl+'/user',this.selectedUser).toPromise();
    else result=await this.httpClient.put<EUser>(Defines.mockAPIBaseUrl+'/user/'+this.selectedUser.id,this.selectedUser).toPromise();
    this.users= await this.getUsers();
    this.loading=false;
  }

  async onBtnDeleteClicked(user:EUser){
    this.loading=true;
    let result= await this.httpClient.delete<EUser>(Defines.mockAPIBaseUrl+"/user/"+user.id).toPromise();
    this.users=await this.getUsers();
    this.loading=false;
  }

  async onBtnChartClicked(){
    await this.router.navigate([Defines.routeChart]);
  }

  async onSearchByName(){
    this.pagingEnabled=false;
    if(this.searchTxt.trim().length==0){
      this.pagingEnabled=true;
      this.users=await this.getUsers();
      return;
    }
    let resultList:EUser[]=[];
    let users=await this.getUsers();
    for(let user of users){
      if(user.name.toLowerCase().indexOf(this.searchTxt.toLowerCase())>-1)resultList.push(user);
    }
    this.users=resultList;
  }

  async sortBy(columnName:string){
    if(!this.users)return;
    switch(columnName){
      case 'id':return this.users.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      case 'name':return this.users.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

}
