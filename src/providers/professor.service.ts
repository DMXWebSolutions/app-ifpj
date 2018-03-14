import { Injectable }             from "@angular/core";

@Injectable()
export class ProfessorService {

    constructor() {}

    public getNavigationPages(): any {
        return [
            { icon: 'ios-home-outline',          title: 'Home',              name: 'home' },
            { icon: 'ios-notifications-outline', title: 'Enviar comunicado', name: 'enviar-comunicado' },
        ];
    }
}