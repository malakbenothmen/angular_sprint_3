import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { voyageGuard } from './voyage.guard'; // Updated to the new class name
import { AuthService } from './services/auth.service';

describe('VoyageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => {
        const guardInstance = new voyageGuard(new AuthService( new Router()), new Router()); // Mock services if needed
        return guardInstance.canActivate(...guardParameters);
      });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, Router], // Add necessary providers for testing
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
