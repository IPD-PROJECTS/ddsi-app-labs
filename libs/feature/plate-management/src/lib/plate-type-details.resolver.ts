import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of, tap, throwError } from "rxjs";
import { NotificationService, PlateTypeService } from "@ddsi-labs-apps/services";
import { ApplicationRoutingService } from "@ddsi-labs-apps/services";
import { PlateTypeModel } from "@ddsi-labs-apps/models";
import { NotificationSeverity } from "@ddsi-labs-apps/enums";

@Injectable({ providedIn: 'root' })
export class PlateTypeDetailResolve implements Resolve<PlateTypeModel> {
  constructor(private service: PlateTypeService, private appRouting: ApplicationRoutingService, private notificationService: NotificationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PlateTypeModel> | Promise<PlateTypeModel> | PlateTypeModel {
    return this.service.getPlateTypeById(route.paramMap.get('id')).pipe(
      catchError((err) => {
        this.notificationService.displayNotification(NotificationSeverity.ERROR, 'Erreur', 'Impossible de récupérer les détails de cet élément');
        this.appRouting.goToListPlateTypePage();
        return of({})
      })
    );
  }
}