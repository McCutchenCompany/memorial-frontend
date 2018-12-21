import { ViewMemorialRoutingModule } from './view-memorial-routing.module';

describe('ViewMemorialRoutingModule', () => {
  let viewMemorialRoutingModule: ViewMemorialRoutingModule;

  beforeEach(() => {
    viewMemorialRoutingModule = new ViewMemorialRoutingModule();
  });

  it('should create an instance', () => {
    expect(viewMemorialRoutingModule).toBeTruthy();
  });
});
