type LoadingState = 'INIT' | 'LOADING' | 'SUCCESS';

type ErrorState = { errorMsg: string };

export type CallState = LoadingState | ErrorState;
