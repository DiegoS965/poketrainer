import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { delay } from 'rxjs/operators';
import { TrainerService } from '../services/trainer/trainer.service';
import { Trainer } from '../models/trainer.model';

export const ProfileDataResolver: ResolveFn<Trainer> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    delay(2000);
    
    return inject(TrainerService).getTrainer();
}

/* export const ProfileDataResolver: ResolveFn<Trainer> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    trainerService: TrainerService = inject(TrainerService)
): Observable<TrainerService> => {
    const existingData = trainerService.getTrainer();
    return existingData.pipe(delay(2000));
} */