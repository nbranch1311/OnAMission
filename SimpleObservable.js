class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(obs) {
    const observer = new Observer(obs);
    observer._unsubscribe = this._subscribe(observer);
    return ({
      unsubscribe() {
        observer.unsubscribe();
      }
    });
  }

  from(values) {
    return new Observable((observer) => {
      values.forEach((value) => observer.next(value));
      observer.complete();
      return () => {
        console.log('Observable.from: unsubscribed');
      };
    });
  }
}

class Observer {
  constructor(handlers) {
    this.handlers = handlers; // next, error and complete
    this.isSubscribed = true;
  }

  next(value) {
    if (this.handlers.next && this.isSubscribed) {
      this.handlers.next(value);
    }
  }

  error(error) {
    if (this.isSubscribed) {
      if (this.handlers.error) {
        this.handlers.error(error);
      }

      this.unsubscribe();
    }
  }

  complete() {
    if (this.isSubscribed) {
      if (this.handlers.complete) {
        this.handlers.complete();
      }

      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isSubscribed = false;

    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}


const numObservable = new Observable();
const numbers$ = numObservable.from([0, 1, 2, 3, 4]);
const subscription = numbers$.subscribe({
  next(value) {
    console.log(value);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.info('done');
  }
});
