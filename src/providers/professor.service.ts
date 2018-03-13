import { Injectable }             from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Injectable()
export class ProfessorService {

    constructor() {}

    public getLoginControls(): any {
        return new FormGroup({
            user:  new FormControl(),
            senha: new FormControl(),
        });
    }

    public getLoginFields(): any {
        return [
            { placeholder: 'Usuário', controlName: 'user',  type: 'text',     icon: 'people' },
            { placeholder: 'Senha',   controlName: 'senha', type: 'password', icon: 'lock' },
        ];
    }

    public getNavigationPages(): any {
        return [
            { icon: 'ios-home-outline',          title: 'Home',              name: 'home' },
            { icon: 'ios-notifications-outline', title: 'Enviar comunicado', name: 'enviar-comunicado' },
        ];
    }
}