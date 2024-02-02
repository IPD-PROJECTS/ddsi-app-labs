import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { NotificationService, PlatePlanService } from "@ddsi-labs-apps/services";
import { ApplicationRoutingService } from "@ddsi-labs-apps/services";
import { PlateModel } from "@ddsi-labs-apps/models";
import { NotificationSeverity } from "@ddsi-labs-apps/enums";

@Injectable({ providedIn: 'root' })
export class PlateDetailResolve implements Resolve<PlateModel> {
  constructor(private service: PlatePlanService, private appRouting: ApplicationRoutingService, private notificationService: NotificationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PlateModel> | Promise<PlateModel> | PlateModel {
    return this.service.getPlateDetailsById(route.paramMap.get('id')).pipe(
      catchError((err) => {
        this.notificationService.displayNotification(NotificationSeverity.ERROR, 'Erreur', 'Impossible de récupérer les détails de la plaque');
        this.appRouting.goToListPlatePlanPage();
        return of({})
      })
    );
  }
}