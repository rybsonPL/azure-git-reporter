export interface ChangesDto {
  changes: ChangeDto[];
  changeCounts: { [changeType: string]: number };
}

export interface ChangeDto {
  item: ItemDto;
  changeType: string;
}

export interface ItemDto {
  path: string;
  url: string;
  isFolder?: boolean;
}
