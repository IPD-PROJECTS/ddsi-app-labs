import { IsPatientAlreadyAddedPipe } from './isPatientAlreadyAdded.pipe';

describe('IsPatientAlreadyAddedPipe', () => {
  it('create an instance', () => {
    const pipe = new IsPatientAlreadyAddedPipe();
    expect(pipe).toBeTruthy();
  });
});
