import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';
import { v4 } from 'uuid';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      age: 10,
      breed: 'PERSIAN',
      name: 'minou',
      uuid: '2e6cf8ed-0544-49d2-b525-435d354368c7',
    },
  ];

  create(newCat: Omit<Cat, 'uuid'>): Cat {
    const cat: Cat = {
      ...newCat,
      uuid: v4(),
    };
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  find(uuid: string): Cat | undefined {
    return this.cats.find(cat => cat.uuid === uuid);
  }

  exist(uuid: string): Boolean {
    return this.cats.findIndex(cat => cat.uuid === uuid) == -1 ? false : true;
  }

  delete(cat: Cat): void {
    const index = this.cats.indexOf(cat);
    if (index !== -1) {
      this.cats.splice(index, 1);
    }
  }
}
