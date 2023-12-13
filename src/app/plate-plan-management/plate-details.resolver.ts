import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { PlatePlanService } from "../shared/service/plate-plan/plate-plan.service";
import { MessageService } from "primeng/api";
import { ApplicationRoutingService } from "../shared/service/application-routing/application-routing.service";
import { PlateModel } from "../shared/models/plate.model";

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