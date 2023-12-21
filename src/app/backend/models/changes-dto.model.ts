export interface ChangesDto {
  changes: ChangeDto[];
}

export interface ChangeDto {
  item: ItemDto;
  changeType: string;
}

export interface ItemDto {
  gitObjectType: string;
  path: string;
  url: string;
  isFolder: boolean;
}
