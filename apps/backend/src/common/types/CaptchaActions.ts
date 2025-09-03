export type CaptchaAction =
  | 'vote'
  | 'new_project'
  | 'update_project'
  | 'transfer_project';
export enum CaptchaActions {
  Vote = 'vote',
  NewProject = 'new_project',
  UpdateProject = 'update_project',
  TransferProject = 'transfer_project',
}
