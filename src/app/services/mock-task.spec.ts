import { TestBed } from '@angular/core/testing';

import { MockTask } from './mock-task';

describe('MockTask', () => {
  let service: MockTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
