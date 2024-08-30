import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { DatatablepageComponent } from "../datatablepage/datatablepage.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserDetail } from '../../model/UserAuth/userDetail';
import { AuthServiceService } from '../../services/auth.service.service';
import { UserStoreService } from '../../services/user-store.service';
import { MatDialog } from '@angular/material/dialog';
import { PositionService } from '../../services/position.service';
import { Position } from '../../model/position';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeNode } from 'primeng/api';
import { log } from 'node:console';
import { UserDetailModalComponent } from '../teamv/user-detail-modal.component';

@Component({
  selector: 'app-evaluate',
  standalone: true,
  imports: [SidebarComponent, DatatablepageComponent, CommonModule, FormsModule, OrganizationChartModule],
  templateUrl: './evaluate.component.html',
  styleUrls: ['./evaluate.component.css']
})
export class EvaluateeComponent implements OnInit {
  public USERNAME: string = "";
  public role: string = "";
  public teamname: string = "";
  public team: string = "";

  username: string = "";
  id!: number;
  level!: number;
  public users: UserDetail[] = [];
  public copyusers: UserDetail[] = [];
  public filterusers: UserDetail[] = [];
  searchTerm: string = '';
  sortColumn: keyof UserDetail = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  visible: boolean = false;
  selectedTeamname: string = '';

  teamList: string[] = [];
  selectedNodes!: TreeNode[];
  roles = ['Ustyönetici', 'Yonetici', 'Calisan', 'Kullanıcı', 'Stajyer'];
  chartDATA!: TreeNode[];

  constructor(
    private authservice: AuthServiceService,
    public matdialog: MatDialog,
    private positionser: PositionService,
    private userstor: UserStoreService
  ) { }

  ngOnInit(): void {
    this.workstore();
    this.getalluser();
 
  }


  convertToTreeNodes(users: any[]): TreeNode[] {

    const findTopRole = (users: any[], rolePriority: string[]): string | null => {
      for (let role of rolePriority) {
        if (users.some(user => user.role === role)) {
          return role;
        }
      }
      return null; // Eğer hiçbir rol bulunamazsa
    };

    const top = findTopRole(this.users, this.roles);


    const roleGroups = this.groupUsersByRole(users);
    const topRole = top;
    console.log("EN YÜKSEK: ", top)
    const rootNodes = roleGroups[topRole ?? 'Yönetici'].map((user: any) => {
      console.log("groupedusers: ", user)
      return this.createTreeNode(user, this.roles.indexOf(top!), roleGroups);
    });

    return rootNodes;
  }

  createTreeNode(user: any, roleIndex: number, roleGroups: { [role: string]: any[] }): TreeNode {

    console.log("iiiiiiiii", roleGroups)
    const node: TreeNode = {
      expanded: true,
      type: 'person',
      data: {
        image: user.imageurl, 
        name: user.name,
        title: user.role
      },
      children: [] // children dizisini burada tanımlıyoruz
    };

    // Bir sonraki rol seviyesini kontrol et
    if (roleIndex < this.roles.length - 1) {
      const nextRole = this.roles[roleIndex + 1];
      console.log("nextrolenumber", nextRole)
      const nextRoleUsers = roleGroups[nextRole] || [];
      console.log("nextroleuserskontrol", nextRoleUsers)
      if (nextRoleUsers.length > 0) {
        // Kullanıcıları alt düğümler olarak ekleyin
        console.log("nextroleusers", nextRoleUsers)
        const childNodes = nextRoleUsers.splice(0, Math.ceil(nextRoleUsers.length / roleGroups[this.roles[roleIndex]].length));
        console.log("childNodes", childNodes)
        childNodes.forEach(childUser => {
          node.children!.push(this.createTreeNode(childUser, roleIndex + 1, roleGroups));
        });
      } else {
        const nextRole = this.roles[roleIndex + 2];
        const nextRoleUsers = roleGroups[nextRole] || [];
        if (nextRoleUsers.length > 0) { //buraya birşeyler daha eklenebilir , bug çıkabilir 
          // Kullanıcıları alt düğümler olarak ekleyin
          console.log("nextroleusers", nextRoleUsers)
          const childNodes = nextRoleUsers.splice(0, Math.ceil(nextRoleUsers.length / roleGroups[this.roles[roleIndex]].length));
          console.log("childNodes", childNodes)
          childNodes.forEach(childUser => {
            node.children!.push(this.createTreeNode(childUser, roleIndex + 1, roleGroups));
          });
        }
      }
    }

    const roleToCheck = this.roles[roleIndex];
    const result = this.hasMultipleData(roleGroups, roleToCheck); //true ise birden fazla en üst statüde user var 


    if (result) {
     
    }

    return node;
  }

  hasMultipleData(roleGroups: { [role: string]: any[] }, role: string): boolean {
    return roleGroups[role] && roleGroups[role].length > 1;
  }
  groupUsersByRole(users: any[]): { [role: string]: any[] } {
    const grouped: { [role: string]: any[] } = {};

    users.forEach(user => {
      if (!grouped[user.role]) {
        grouped[user.role] = [];
      }
      grouped[user.role].push(user);
    });

    return grouped;
  }

  createChildNodes(users: any[]): TreeNode[] {
    return users.map(user => ({
      type: 'person',
      expanded: true,
      data: {
        image: user.imageurl,
        name: user.name,
        title: user.role
      },
      children: []
    }));
  }
  getUsers() {
    this.users = this.copyusers;

    if (this.selectedTeamname) {
      this.users = this.users.filter((user: UserDetail) => user.teamname === this.selectedTeamname);
    }
    console.log(this.users)
    this.visible = true;
    console.log("this.users", this.users)
    this.chartDATA = this.convertToTreeNodes(this.users);
  }

  workstore() {
    this.userstor.getUserIdStore()
      .subscribe(val => {
        const USERNAMEFromToken = this.authservice.getUserIdFromToken();
        this.id = val || USERNAMEFromToken;
      });

    this.userstor.getRoleFromStore()
      .subscribe(val => {
        const getRoleFromToken = this.authservice.getRoleFromToken();
        this.role = val || getRoleFromToken;
      });

    this.userstor.getTeamNameStore()
      .subscribe(val => {
        const getTeamNameFromToken = this.authservice.getTeamNameFromToken();
        this.teamname = val || getTeamNameFromToken;
      });

    this.userstor.getLevelFromStore()
      .subscribe(val => {
        const getUserLevelFromToken = this.authservice.getUserLevelFromToken();
        this.level = val || getUserLevelFromToken;
      });
  }

  toggleNode(event: Event) {
    const target = event.target as HTMLElement;
    const node = target.closest('.node') as HTMLElement;
    if (node) {
      node.classList.toggle('expanded');
    }
  }

  clearSelections() {
    this.selectedTeamname = '';
    this.getUsers();
  }

  openDialog(user: UserDetail) {
    this.matdialog.open(UserDetailModalComponent, {
      data: user,
      width: '400px',
      height: 'auto',
    });
  }


  getalluser() {
    this.authservice.getalluser(32).subscribe(async (response: any) => {
      if (response.data != null) {
        this.users = await response.data;


        this.copyusers = this.users;
        this.teamList = Array.from(new Set(this.users.map(user => user.teamname))); // Takım listesi oluşturuluyor
      }
    });
  }

  clearSearch() {
    this.searchTerm = '';
  }

}



