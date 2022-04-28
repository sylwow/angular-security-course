import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { map } from "rxjs/operators";
import { User } from "./model/user";
import { AuthService } from "./services/auth.service";

@Directive({
    selector: '[rbacAllow]'
})
export class RbacAllowDirective implements OnDestroy {

    allowedRoles: string[];
    user: User;
    sub: any;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authService: AuthService) {


        this.sub = this.authService.user$.subscribe(user => {
            this.user = user;
            this.showIfUserAllowed();
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;

        this.showIfUserAllowed();
    }

    private showIfUserAllowed() {
        if (!!this.allowedRoles &&
            this.allowedRoles.length > 0 &&
            !!this.user &&
            this.allowedRoles.every(role => this.user.roles.includes(role))) {

            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
        else {
            this.viewContainerRef.clear();
        }
    }
}