import { NetworkService } from '../network/network.service';

export interface ListenerContract {
    listen(networkService: NetworkService);
}