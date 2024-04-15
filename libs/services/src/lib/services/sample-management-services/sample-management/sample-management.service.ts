import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SampleManagementService {
  getMockData() {
    return [
      {
        id: 'Sample-E1000',
        name: 'James Butt',
        country: {
          name: 'Algeria',
          code: 'dz',
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'accepted',
        verified: true,
        activity: 17,
        updated_by: 'Admin',
        representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png',
        },
        balance: 70663,
        tests: [
          {
            id: 'test-002',
            name: 'Name',
            date: '2015-09-13',
            status: 'test_preparation',
            updated_by: 'Scientist 01',
          },
          {
            id: 'test-003',
            name: 'Name',
            date: '2015-09-13',
            status: 'testing',
            updated_by: 'Scientist 007',
          },
        ],
      },
      {
        id: 'Sample-E1001',
        name: 'Josephine Darakjy',
        country: {
          name: 'Egypt',
          code: 'eg',
        },
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'accepted',
        updated_by: 'Admin',
        verified: true,
        activity: 0,
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png',
        },
        balance: 82429,
        tests: [
          {
            id: 'test-006',
            name: 'Name',
            date: '2015-09-13',
            status: 'testing',
            updated_by: 'Lab Scientist 001',
          },
          {
            id: 'test-007',
            name: 'Name',
            date: '2015-09-13',
            status: 'report_validation',
            updated_by: 'Lab Scientist 001',
          },
          {
            id: 'test-008',
            name: 'Name',
            date: '2015-09-13',
            status: 'test_preparation',
            updated_by: 'Lab Scientist 002',
          },
        ],
      },
      {
        id: 'Sample-E1003',
        name: 'Josephine Darakjy',
        country: {
          name: 'Egypt',
          code: 'eg',
        },
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'rejected',
        updated_by: 'Admin',
        verified: true,
        activity: 0,
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png',
        },
        balance: 82429,
        tests: [],
      },
    ];
  }

  getCustomersMedium() {
    return Promise.resolve(this.getMockData().slice(0, 50));
  }
}
