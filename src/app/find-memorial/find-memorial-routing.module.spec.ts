import { FindMemorialRoutingModule } from './find-memorial-routing.module';

describe('FindMemorialRoutingModule', () => {
  let findMemorialRoutingModule: FindMemorialRoutingModule;

  beforeEach(() => {
    findMemorialRoutingModule = new FindMemorialRoutingModule();
  });

  it('should create an instance', () => {
    expect(findMemorialRoutingModule).toBeTruthy();
  });
});
