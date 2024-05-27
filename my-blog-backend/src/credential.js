const credentialInfo = {
    type: process.env.credential_type,
    project_id: process.env.credential_project_id,
    private_key_id: process.env.credential_private_key_id,
    private_key: process.env.credential_private_key,
    client_email: process.env.credential_client_email,
    client_id: process.env.credential_client_id,
    auth_uri: process.env.credential_auth_uri,
    token_uri: process.env.credential_token_uri,
    auth_provider_x509_cert_url: process.env.credential_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.credential_client_x509_cert_url,
    universe_domain: process.env.credential_universe_domain
}

export default credentialInfo;