import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { PlatePlanService } from "@ddsi-labs-apps/services";
import { MessageService } from "primeng/api";
import { ApplicationRoutingService } from "@ddsi-labs-apps/services";
import { PlateModel } from "@ddsi-labs-apps/models";

@Injectable({ providedIn: 'root' })
export class PlateDetailResolve implements Resolve<PlateModel> {
  constructor(private service: PlatePlanService, private appRouting: ApplicationRoutingService, private messageService: MessageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PlateModel> | Promise<PlateModel> | PlateModel {
    return this.service.getPlateDetailsById(route.paramMap.get('id')).pipe(
      catchError((err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cannot get the details for this plate' });
        this.appRouting.goToListPlatePlanPage();
        return of({})
      })
    );
  }
}