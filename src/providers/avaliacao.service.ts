import { Injectable } from "@angular/core";

@Injectable()
export class AvaliacaoService {
    private mapavaliacoes = {
        '01': '1º Trimestre',
        '02': '2º Trimestre',
        '03': '3º Trimestre',
        '10': 'Recuperação I',
        '11': 'Recuperação II',
      };

    public getName(codverifi: string): string {
        return this.mapavaliacoes[codverifi];
    }
}