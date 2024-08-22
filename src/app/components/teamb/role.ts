import { UserDetail } from "../../model/UserAuth/userDetail";

export interface RoleGroups {
    [role: string]: UserDetail[];
  }

  export interface TreeNode {
    expanded: boolean;
    type: string;
    data: {
      image: string;
      name: string;
      title: string;
    };
    children?: TreeNode[];
  }