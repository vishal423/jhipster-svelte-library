import { notification } from '../notification/notification-store';

export function handleResponse(response, notify) {
	if (notify) {
		processAlertHeaders(response, response.ok);
	}
	if (response.ok) {
		if (isListApiBeingCalled(response)) {
			return new Promise(resolve =>
				response.json().then(data =>
					resolve({
						data,
						totalCount: response.headers.get('X-Total-Count'),
					})
				)
			);
		} else if (isJson(response)) {
			return response.json();
		} else {
			return response.text();
		}
	}

	return response.err ? Promise.reject(response.err) : response.json().then(Promise.reject.bind(Promise));
}

function processAlertHeaders(response, isSuccessResponse) {
	for (let key of response.headers.keys()) {
		const isPresent = key.toLowerCase().endsWith(isSuccessResponse ? 'app-alert' : 'app-error');
		if (isPresent) {
			notification.add(response.headers.get(key), isSuccessResponse ? 'success' : 'danger');
		}
	}
}

function isListApiBeingCalled(response) {
	return response.headers.get('X-Total-Count') !== null;
}

function isJson(response) {
	const contentType = response.headers.get('Content-Type');
	if (contentType !== null) {
		return contentType.indexOf('application/json') > -1;
	}
	return false;
}
