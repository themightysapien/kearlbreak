import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface ActionPayload {
    channel: string;
    payload: object;
}

@Injectable({
    providedIn: 'root'
})
export class ActionMediator {

    private subject = new Subject<ActionPayload>();

    do(c, data: object) {
        this.subject.next({
            channel: c,
            payload: data
        });
    }

    on(channel): Observable<any> {
        console.log(channel);
        return this.subject.asObservable().
            pipe(filter((payload: ActionPayload) => {
                return payload.channel == channel;
            }))
            .pipe(map(res => res.payload));
    }
}
