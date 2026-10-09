import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PiecesJustificativesSchema, type PieceJustificative } from './pieces-justificative.schema';
import {
  PieceJustificativeDetailSchema,
  type PieceJustificativeDetail,
} from './piece-justificative-detail.schema';

export type ErreurApi = { type: 'habilitation' } | { type: 'introuvable' } | { type: 'reseau' };

function versErreurApi(erreur: HttpErrorResponse): ErreurApi {
  if (erreur.status === 403) return { type: 'habilitation' };
  if (erreur.status === 404) return { type: 'introuvable' };
  return { type: 'reseau' };
}

@Injectable({ providedIn: 'root' })
export class PiecesJustificativesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/pieces-justificatives';

  listerPiecesJustificatives(): Observable<PieceJustificative[]> {
    return this.http.get<unknown>(this.baseUrl).pipe(
      map((donnees) => PiecesJustificativesSchema.parse(donnees)),
      catchError((erreur: HttpErrorResponse) => throwError(() => versErreurApi(erreur))),
    );
  }

  obtenirDetail(reference: string): Observable<PieceJustificativeDetail> {
    return this.http.get<unknown>(`${this.baseUrl}/${encodeURIComponent(reference)}`).pipe(
      map((donnees) => PieceJustificativeDetailSchema.parse(donnees)),
      catchError((erreur: HttpErrorResponse) => throwError(() => versErreurApi(erreur))),
    );
  }
}
