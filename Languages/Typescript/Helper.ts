
export class Helper{

    //Returns true if the value is integer
    public static isInteger(value?:string) :boolean{
      if(!value)return false;
      return /^\d+$/.test(value);
    }

  }