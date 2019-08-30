export class MilitaryBranch {
  uuid: string;
  name: string;
  image: string;
  description: string;
}

export class MilitaryMedal {
  uuid: string;
  date_awarded: string;
  description: string;
  order: number;
  medal: {
    uuid: string;
    name: string;
    image: string;
  };
}

export class MilitaryRank {
  uuid: string;
  name: string;
  image: string;
}

export class MilitaryHistory {
  uuid: string;
  start_date: string;
  end_date: string;
  mem_military_branches_medals: MilitaryMedal[];
  military_branch: MilitaryBranch;
  military_rank: MilitaryRank;
}
