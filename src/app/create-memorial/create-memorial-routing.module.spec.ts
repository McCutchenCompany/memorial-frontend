import { CreateMemorialRoutingModule } from './create-memorial-routing.module';

describe('CreateMemorialRoutingModule', () => {
  let createMemorialRoutingModule: CreateMemorialRoutingModule;

  beforeEach(() => {
    createMemorialRoutingModule = new CreateMemorialRoutingModule();
  });

  it('should create an instance', () => {
    expect(createMemorialRoutingModule).toBeTruthy();
  });
});
