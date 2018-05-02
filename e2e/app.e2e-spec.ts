import { AppPage } from './app.po';

describe('angular5-express-starter App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should contain angular5-express-starter in mat-toolbar', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('angular5-express-starter');
  });
});
