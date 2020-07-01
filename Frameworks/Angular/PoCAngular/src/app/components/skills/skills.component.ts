import { Component, OnInit } from '@angular/core';
import {Defines} from '../../codes/defines';
import {EUser} from '../../entities/euser';
import {HttpClient} from '@angular/common/http';
import {ESkill} from '../../entities/eskill';
import {Router} from '@angular/router';
import {GlobalsService} from '../../codes/globals.service';

@Component({
  selector: Defines.routeSkills,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  selectedSkill=<ESkill>{id:0};
  skills?:ESkill[];
  showModal=false;
  loading=false;
  searchTxt='';
  currentPage=1;
  pagingEnabled=true;

  constructor(private httpClient:HttpClient,protected router: Router,private globals:GlobalsService) {
  }

  async ngOnInit(){
    this.skills= await this.getSkills();
  }

  async getSkills(){
    if(!Defines.selectedUserID)await this.router.navigate([Defines.routeUsers]);
    if(this.pagingEnabled) return await this.httpClient.get<ESkill[]>(Defines.mockAPIBaseUrl+'/user/'+Defines.selectedUserID+'/skills?page='+this.currentPage+'&limit='+this.globals.pageSize).toPromise();
    else return await this.httpClient.get<ESkill[]>(Defines.mockAPIBaseUrl+'/user/'+Defines.selectedUserID+'/skills').toPromise();
  }

  onBtnAddClicked(){
    this.selectedSkill=<ESkill>{id:0};
    this.showModal=true;
  }

  onBtnEditClicked(skill:ESkill){
    this.selectedSkill=skill;
    this.showModal=true;
  }

  async onBtnPreviousClicked(){
    this.pagingEnabled=true;
    if(this.currentPage==1)return;
    this.currentPage--;
    this.skills=await this.getSkills();
  }

  async onBtnNextClicked(){
    this.pagingEnabled=true;
    this.currentPage++;
    this.skills=await this.getSkills();
  }

  async onBtnSaveClicked(){
    this.showModal=false;
    let result:ESkill;
    this.loading=true;
    if(this.selectedSkill.id==0) result=await this.httpClient.post<ESkill>(Defines.mockAPIBaseUrl+'/user/'+Defines.selectedUserID+'/skills',this.selectedSkill).toPromise();
    else result=await this.httpClient.put<ESkill>(Defines.mockAPIBaseUrl+'/user/'+Defines.selectedUserID+'/skills/'+this.selectedSkill.id,this.selectedSkill).toPromise();
    this.skills= await this.getSkills();
    this.loading=false;
  }

  async onBtnDeleteClicked(skill:ESkill){
    this.loading=true;
    let result= await this.httpClient.delete<ESkill>(Defines.mockAPIBaseUrl+"/user/"+Defines.selectedUserID+'/skills/'+skill.id).toPromise();
    this.skills=await this.getSkills();
    this.loading=false;
  }

  async onSearchByName(){
    this.pagingEnabled=false;
    if(this.searchTxt.trim().length==0){
      this.pagingEnabled=true;
      this.skills=await this.getSkills();
      return;
    }
    let resultList:ESkill[]=[];
    let skills=await this.getSkills();
    for(let skill of skills){
      if(skill.name.toLowerCase().indexOf(this.searchTxt.toLocaleLowerCase())>-1)resultList.push(skill);
    }
    this.skills=resultList;
  }

  async sortBy(columnName:string){
    if(!this.skills)return;
    switch(columnName){
      case 'id':return this.skills.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
      case 'name':return this.skills.sort((a, b) => a.name.localeCompare(b.name));
      case 'level':return this.skills.sort((a, b) => a.level < b.level ? -1 : a.level > b.level ? 1 : 0);
    }
  }

}
