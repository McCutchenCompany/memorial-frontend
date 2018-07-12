import { CreateMemorialModule } from './create-memorial.module';

describe('CreateMemorialModule', () => {
  let createMemorialModule: CreateMemorialModule;

  beforeEach(() => {
    createMemorialModule = new CreateMemorialModule();
  });

  it('should create an instance', () => {
    expect(createMemorialModule).toBeTruthy();
  });
});
