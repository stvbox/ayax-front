import { Department } from './department';


        /*public int id { get; set; }
        public string guid { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int DepId { get; set; }
        public DateTime RegDate { get; set; }*/



export class Realtor {
    id: number;
    guid: string;
    name: string;
    surname: string;
    depId: number;
    Department: Department;
    regDate: Date;
}
