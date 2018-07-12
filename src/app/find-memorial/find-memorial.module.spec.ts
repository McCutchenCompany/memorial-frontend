import { FindMemorialModule } from './find-memorial.module';

describe('FindMemorialModule', () => {
  let findMemorialModule: FindMemorialModule;

  beforeEach(() => {
    findMemorialModule = new FindMemorialModule();
  });

  it('should create an instance', () => {
    expect(findMemorialModule).toBeTruthy();
  });
});
