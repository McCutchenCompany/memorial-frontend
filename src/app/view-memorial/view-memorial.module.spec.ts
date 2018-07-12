import { ViewMemorialModule } from './view-memorial.module';

describe('ViewMemorialModule', () => {
  let viewMemorialModule: ViewMemorialModule;

  beforeEach(() => {
    viewMemorialModule = new ViewMemorialModule();
  });

  it('should create an instance', () => {
    expect(viewMemorialModule).toBeTruthy();
  });
});
