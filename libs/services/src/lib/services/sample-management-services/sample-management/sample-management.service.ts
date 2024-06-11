import { Injectable, inject } from '@angular/core';
import { LocalStorageService, STORAGE_KEYS } from '../../local-storage/local-storage.service';
import { Sample } from '@ddsi-labs-apps/models';

@Injectable({
  providedIn: 'root',
})
export class SampleManagementService {
  private lStorage = inject(LocalStorageService);
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

  getListSample(): Sample[] {
    return this.lStorage.getFromLocalStorage(STORAGE_KEYS.SAMPLES) as Sample[] || []
  }
  updateSampleList(newList: Sample[]) {
    this.lStorage.saveToLocalStorage(STORAGE_KEYS.SAMPLES, newList)
  }
  getSampleById(id: string): Sample | undefined {
    const list =  this.getListSample();
    return list.find((elt) => elt.id === id )
  }

  saveSample(sample: Sample) {
    const listSampleSaved = this.getListSample();
    if(!sample.id) sample.id = new Date().getTime().toString();
    listSampleSaved.push(sample);
    this.lStorage.saveToLocalStorage(STORAGE_KEYS.SAMPLES, listSampleSaved);
  }

  updateSample(sample: Sample) {
    const listSamples = this.getListSample();
    const index = listSamples.findIndex((elt) => elt.id === sample.id);
    if(index !== -1) {
      listSamples[index] = sample;
      this.updateSampleList(listSamples)
    }

  }

  deleteById(id: string) {
    const list = this.getListSample();
    const index = list.findIndex((elt) => elt.id === id);
    list.splice(index, 1);
    this.updateSampleList(list);
  }
}
