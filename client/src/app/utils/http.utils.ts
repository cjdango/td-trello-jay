/**
 * Joins all given URL segments together, then normalizes the resulting URL.
 * @param args e.g `'http://www.google.com', 'a', '/b/cd', '?foo=123', '?bar=foo'`
 */
export const URLJoin = (...args: any[]) =>
    args
        .join('/')                          // combine URL segments
        .replace(/[\/]+/g, '/')             // remove double slashes

        .replace(/^(.+):\//, '$1://')       // add proper slashes for protocol
        .replace(/^file:/, 'file:/')

        .replace(/\/(\?|&|#[^!])/g, '$1')   // remove slashes before parameters
        .replace(/\?/g, '&')                // combine parameters with '&'
        .replace('&', '?')                  // normalize first parameter delimiter
        .replace(/\/?$/, '/');              // append trailing slash if there's none


/**
 * Generate url based on endpoint format, urlparams, and queryparams as arguments.
 * Made for dynamic endpoints.
 * @param endpointFormat Endpoint format which denotes url params with `:paramname/`
 * @param urlParams `{paramname:value,...}` url params as key value pair
 * @param queryParams `{paramname:value,...}` query params as key value pair
 */
export const resolveEndpoint = (
    endpointFormat: string,
    urlParams: {[key: string]: any} = {},
    queryParams: {[key: string]: any} = {}
) => {
    let endpoint = endpointFormat;

    // Check each url param and place it in it's specified position
    Object.keys(urlParams).forEach(paramName => {
        const paramFormat = new RegExp(`:(${paramName})\/`);
        endpoint = endpoint.replace(paramFormat, `${urlParams[paramName]}/`);
    });

    if (Object.keys(queryParams).length) {
        // Map query params into 'key=value' format and then join by '&'
        const queryParamStr = Object.keys(queryParams)
            .map(key => `${key}=${queryParams[key]}`)
            .join('&');

        // replace trailing slash with queryParamStr
        endpoint = endpoint.replace(/\/?$/, `?${queryParamStr}`);
    }

    return endpoint;
};


