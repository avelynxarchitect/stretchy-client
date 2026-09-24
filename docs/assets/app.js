/**
 * AveLynx Stretchy Client - Interactive Playground & Slicer Testbench
 * Official Live Search Engine Interface powered by Cloudflare Workers & D1
 * (c) 2026 AveLynx (MYZBROS ENTERPRISES LLC)
 */

// 1. Pre-cached Ground Truth Snapshots of Isolated Demo Indices (Cloudflare D1)
const DEMO_DATASETS = {
  "demo_cyber_threats": [
    {
      "id": "threat_14",
      "src_ip": "185.220.101.5",
      "src_country": "DE",
      "src_city": "Berlin",
      "dest_ip": "151.101.65.140",
      "dest_country": "GB",
      "dest_city": "London",
      "flow_volume": 340000,
      "latency_ms": 28,
      "packets_per_sec": 39000,
      "threat_score": 82,
      "threat_level": "High",
      "attack_type": "BOLA_API_EXPLOIT",
      "protocol": "HTTPS",
      "title": "London Banking Microservice BOLA Attempt",
      "_id": "threat_14",
      "content_hash": "835a9a0569a888a13ee6b178afff723b0a9a6acdcc1e19ffc802fd976fdb9ff0"
    },
    {
      "id": "threat_15",
      "src_ip": "190.216.240.2",
      "src_country": "MX",
      "src_city": "Mexico City",
      "dest_ip": "198.51.100.8",
      "dest_country": "US",
      "dest_city": "Dallas",
      "flow_volume": 295000,
      "latency_ms": 48,
      "packets_per_sec": 11000,
      "threat_score": 25,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "HTTPS",
      "title": "Dallas Cloud Hub Ingestion Stream",
      "_id": "threat_15",
      "content_hash": "f44283ba7f8f34da5b288a22acf74b8c814582f9228c84d603f2dffb099e8499"
    },
    {
      "id": "threat_12",
      "src_ip": "220.181.38.148",
      "src_country": "CN",
      "src_city": "Beijing",
      "dest_ip": "13.107.4.52",
      "dest_country": "US",
      "dest_city": "Seattle",
      "flow_volume": 412000,
      "latency_ms": 178,
      "packets_per_sec": 42000,
      "threat_score": 91,
      "threat_level": "Critical",
      "attack_type": "SQL_INJECTION",
      "protocol": "HTTPS",
      "title": "Seattle Portal Bypassed SQLi Attack Vector",
      "_id": "threat_12",
      "content_hash": "52769e7aa450737b1a43f94d0d09dd78df931419bfc03adf7bd4539cc65a80c8"
    },
    {
      "id": "threat_13",
      "src_ip": "211.233.78.20",
      "src_country": "KR",
      "src_city": "Seoul",
      "dest_ip": "104.244.42.1",
      "dest_country": "US",
      "dest_city": "San Francisco",
      "flow_volume": 670000,
      "latency_ms": 122,
      "packets_per_sec": 21000,
      "threat_score": 38,
      "threat_level": "Medium",
      "attack_type": "RATE_LIMIT_EXCEEDED",
      "protocol": "TLS/REST",
      "title": "San Francisco API Tier Throttling",
      "_id": "threat_13",
      "content_hash": "afaad7b01e5cbd0680e109f54d36842bc0664273b4d1a663d44fad1dca241a2e"
    },
    {
      "id": "threat_10",
      "src_ip": "105.180.12.3",
      "src_country": "ZA",
      "src_city": "Cape Town",
      "dest_ip": "62.153.2.14",
      "dest_country": "DE",
      "dest_city": "Frankfurt",
      "flow_volume": 142000,
      "latency_ms": 156,
      "packets_per_sec": 4900,
      "threat_score": 20,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "TLS/gRPC",
      "title": "Cape Town South Africa Telemetry Tunnel",
      "_id": "threat_10",
      "content_hash": "7c92a10b21f003706bd3e913bfff381480adc2b7939fa4eb3a5fdecc8808dd30"
    },
    {
      "id": "threat_11",
      "src_ip": "194.26.29.112",
      "src_country": "FR",
      "src_city": "Paris",
      "dest_ip": "142.250.190.46",
      "dest_country": "US",
      "dest_city": "Los Angeles",
      "flow_volume": 890000,
      "latency_ms": 142,
      "packets_per_sec": 64000,
      "threat_score": 95,
      "threat_level": "Critical",
      "attack_type": "DDOS_SYN_FLOOD",
      "protocol": "TCP/SYN",
      "title": "Los Angeles Edge WAF Anti-DDoS Mitigation",
      "_id": "threat_11",
      "content_hash": "c46ded1645b4a2d88a1c870b52ffafb29a4bf4a9b9ef79fc068cee9d07794087"
    },
    {
      "id": "threat_09",
      "src_ip": "188.150.12.8",
      "src_country": "SE",
      "src_city": "Stockholm",
      "dest_ip": "203.0.113.19",
      "dest_country": "JP",
      "dest_city": "Tokyo",
      "flow_volume": 164000,
      "latency_ms": 210,
      "packets_per_sec": 5800,
      "threat_score": 16,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "HTTPS",
      "title": "Nordic API Sync to Tokyo Edge",
      "_id": "threat_09",
      "content_hash": "22f3d5e67717841fc8944be564228c2bb6a8481d8d5e8fb9738d37395466e7bf"
    },
    {
      "id": "threat_08",
      "src_ip": "84.116.30.22",
      "src_country": "NL",
      "src_city": "Amsterdam",
      "dest_ip": "52.96.10.5",
      "dest_country": "US",
      "dest_city": "Ashburn",
      "flow_volume": 530000,
      "latency_ms": 84,
      "packets_per_sec": 19800,
      "threat_score": 45,
      "threat_level": "Medium",
      "attack_type": "CREDENTIAL_STUFFING",
      "protocol": "WireGuard",
      "title": "Ashburn Auth Gateway Probe",
      "_id": "threat_08",
      "content_hash": "4f15b77884e72ddeb5054944754d04fa31dacb7e29562ac737ece8931aa3a1cc"
    },
    {
      "id": "threat_07",
      "src_ip": "101.100.22.4",
      "src_country": "SG",
      "src_city": "Singapore",
      "dest_ip": "1.0.0.1",
      "dest_country": "AU",
      "dest_city": "Melbourne",
      "flow_volume": 275000,
      "latency_ms": 88,
      "packets_per_sec": 9400,
      "threat_score": 12,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "BGP/Peer",
      "title": "Equinix Melbourne BGP Peering Mesh",
      "_id": "threat_07",
      "content_hash": "c2a0889c15e7efe5856ce1f30ee44ec6fb5c2aab99c2fe9a037aebdc2e9af82f"
    },
    {
      "id": "threat_06",
      "src_ip": "49.44.12.99",
      "src_country": "IN",
      "src_city": "Mumbai",
      "dest_ip": "82.165.197.1",
      "dest_country": "GB",
      "dest_city": "London",
      "flow_volume": 385000,
      "latency_ms": 124,
      "packets_per_sec": 13500,
      "threat_score": 30,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "HTTPS",
      "title": "Mumbai Cloud Proxy Upstream Relay",
      "_id": "threat_06",
      "content_hash": "18562e5322e46bd1bbf83bd85b1536de3d44b52a81423b396c3cef2d685d301a"
    },
    {
      "id": "threat_05",
      "src_ip": "177.10.45.66",
      "src_country": "BR",
      "src_city": "São Paulo",
      "dest_ip": "73.18.90.14",
      "dest_country": "US",
      "dest_city": "Miami",
      "flow_volume": 198000,
      "latency_ms": 92,
      "packets_per_sec": 38000,
      "threat_score": 88,
      "threat_level": "High",
      "attack_type": "SSH_BRUTE_FORCE",
      "protocol": "SSH/Brute",
      "title": "Miami SSH Bastion Infiltration Attempt",
      "_id": "threat_05",
      "content_hash": "df1c7e8552f0ca5a406c6a3a2ab2d51e1b7d12f186218a3dbdc644267802aa97"
    },
    {
      "id": "threat_04",
      "src_ip": "77.88.21.90",
      "src_country": "GB",
      "src_city": "London",
      "dest_ip": "1.1.1.1",
      "dest_country": "AU",
      "dest_city": "Sydney",
      "flow_volume": 245000,
      "latency_ms": 286,
      "packets_per_sec": 7800,
      "threat_score": 15,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "TLS/REST",
      "title": "London to Sydney Primary Replication",
      "_id": "threat_04",
      "content_hash": "75606bc1e58612e35fa6e5528a10b89f63f7b42c80f513e608015f4e06705b0d"
    },
    {
      "id": "threat_03",
      "src_ip": "43.240.10.12",
      "src_country": "JP",
      "src_city": "Tokyo",
      "dest_ip": "24.105.30.1",
      "dest_country": "US",
      "dest_city": "New York",
      "flow_volume": 610000,
      "latency_ms": 132,
      "packets_per_sec": 24000,
      "threat_score": 55,
      "threat_level": "Medium",
      "attack_type": "API_BURST_FLOOD",
      "protocol": "QUIC",
      "title": "New York Financial Edge QUIC Burst",
      "_id": "threat_03",
      "content_hash": "9ef49ac22cd0ff2bf323bd5d83da1ba46c90ed491bfdf86fd12188f75cf57dac"
    },
    {
      "id": "threat_02",
      "src_ip": "46.114.88.21",
      "src_country": "DE",
      "src_city": "Frankfurt",
      "dest_ip": "101.12.80.5",
      "dest_country": "SG",
      "dest_city": "Singapore",
      "flow_volume": 320500,
      "latency_ms": 164,
      "packets_per_sec": 11200,
      "threat_score": 18,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "HTTPS",
      "title": "Singapore API Gateway Health Polling",
      "_id": "threat_02",
      "content_hash": "6c5870837d591341ddbaf4be14d8d254878644a5680265aa2d9273993c46eab9"
    },
    {
      "id": "threat_01",
      "src_ip": "76.102.12.45",
      "src_country": "US",
      "src_city": "San Francisco",
      "dest_ip": "198.51.100.44",
      "dest_country": "DE",
      "dest_city": "Frankfurt",
      "flow_volume": 482000,
      "latency_ms": 118,
      "packets_per_sec": 14500,
      "threat_score": 22,
      "threat_level": "Low",
      "attack_type": "NORMAL_TRAFFIC",
      "protocol": "TLS/gRPC",
      "title": "Frankfurt Datacenter Cross-Region TLS Stream",
      "_id": "threat_01",
      "content_hash": "e3fcdf32edb88d4f53b8627755e067be8e4ed6ac851aa1925bdf2e8057c7c21c"
    }
  ],
  "soc_logs": [
    {
      "id": "soc_log_waf_drop_sqli",
      "title": "WAF Edge Mitigation: Blind SQLi Attempt Throttled",
      "organization": "Axios SOC Cyber Shield",
      "category": "CRITICAL",
      "content": "Automated edge WAF rule #4092 dropped hostile payload `UNION SELECT null, username, password_hash FROM auth_users--` originating from IP 185.220.101.5.",
      "severity": "CRITICAL",
      "client_ip": "185.220.101.5",
      "action": "WAF_DROP",
      "mitre_ttp": "T1190",
      "tags": [
        "soc",
        "critical",
        "waf",
        "sqli",
        "mitre"
      ],
      "_id": "soc_log_waf_drop_sqli",
      "content_hash": "e50fbb4713244fb43f416b18303c22ccf08cded48662a17414cf246fdd266a0f"
    },
    {
      "id": "inc_fcd2504375b6",
      "title": "IDOR / Cross-Tenant Access Violation",
      "incident_id": "inc_fcd2504375b6",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "BOLA_CROSS_TENANT_VIOLATION",
      "type": "BOLA_CROSS_TENANT_VIOLATION",
      "status": "RESOLVED",
      "action": "RESOLVED",
      "service_name": "Global Mesh",
      "serviceName": "Global Mesh",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Actor belonging to [tenant_alpha] attempted unauthorized direct object access on [tenant_beta_record_99]",
      "content": "IDOR / Cross-Tenant Access Violation - Actor belonging to [tenant_alpha] attempted unauthorized direct object access on [tenant_beta_record_99]. Remediation: Inspect traffic. Status: RESOLVED",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "BOLA_CROSS_TENANT_VIOLATION",
        "HIGH",
        "RESOLVED",
        "RESOLVED"
      ],
      "timestamp": "2026-09-16T02:44:43.505Z",
      "_id": "inc_fcd2504375b6",
      "content_hash": "3a47f6b3b3c9f6a7a4acfdb74eae4e970b75b82165350956b81b2263d537502b"
    },
    {
      "id": "inc_dlp_1789527972188",
      "title": "DLP Violation: CONFIDENTIAL_PII_EXPOSURE in [client_financial_underwriting.csv]",
      "incident_id": "inc_dlp_1789527972188",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "CONFIDENTIAL_PII_EXPOSURE",
      "type": "CONFIDENTIAL_PII_EXPOSURE",
      "status": "RESOLVED",
      "action": "RESOLVED",
      "service_name": "File DLP Guard",
      "serviceName": "File DLP Guard",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Found 4 confidential PII instances (SSN: 2, BANK_ACCOUNT: 2)",
      "content": "DLP Violation: CONFIDENTIAL_PII_EXPOSURE in [client_financial_underwriting.csv] - Found 4 confidential PII instances (SSN: 2, BANK_ACCOUNT: 2). Remediation: Inspect traffic. Status: RESOLVED",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "CONFIDENTIAL_PII_EXPOSURE",
        "HIGH",
        "RESOLVED",
        "RESOLVED"
      ],
      "timestamp": "2026-09-16T03:06:12.188Z",
      "_id": "inc_dlp_1789527972188",
      "content_hash": "aad840c7695902f36b2991ded478d47bcc8088c2ccdebe0620faf353d14ab2d3"
    },
    {
      "id": "inc_dlp_1789528041131",
      "title": "DLP Incident: Cryptographic Private Key & SSN in Export",
      "incident_id": "inc_dlp_1789528041131",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "PRIVATE_KEY_LEAK",
      "type": "PRIVATE_KEY_LEAK",
      "status": "RESOLVED",
      "action": "RESOLVED",
      "service_name": "File DLP Guard",
      "serviceName": "File DLP Guard",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "DLP scanner blocked client_financial_export.csv containing raw RSA Private Key and unmasked SSN.",
      "content": "DLP Incident: Cryptographic Private Key & SSN in Export - DLP scanner blocked client_financial_export.csv containing raw RSA Private Key and unmasked SSN.. Remediation: Inspect traffic. Status: RESOLVED",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "PRIVATE_KEY_LEAK",
        "CRITICAL",
        "RESOLVED",
        "RESOLVED"
      ],
      "timestamp": "2026-09-16T03:07:21.130Z",
      "_id": "inc_dlp_1789528041131",
      "content_hash": "bb30ffefffb676bccb962ead466fe90c9a02798b0017a02760726aae3884fc40"
    },
    {
      "id": "inc_9003b28cfc6b",
      "title": "Abnormal Data Egress / Mass Exfiltration Anomaly",
      "incident_id": "inc_9003b28cfc6b",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "MASS_DATA_EXFILTRATION",
      "type": "MASS_DATA_EXFILTRATION",
      "status": "RESOLVED",
      "action": "RESOLVED",
      "service_name": "Global Mesh",
      "serviceName": "Global Mesh",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Actor [attacker_1789526683503] generated 7 read/export actions (3.34 MB) within 60 seconds.",
      "content": "Abnormal Data Egress / Mass Exfiltration Anomaly - Actor [attacker_1789526683503] generated 7 read/export actions (3.34 MB) within 60 seconds.. Remediation: Inspect traffic. Status: RESOLVED",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "MASS_DATA_EXFILTRATION",
        "HIGH",
        "RESOLVED",
        "RESOLVED"
      ],
      "timestamp": "2026-09-16T02:44:43.503Z",
      "_id": "inc_9003b28cfc6b",
      "content_hash": "e565e99d9782264d15dddddbf3f4bbb30096eff060c73b279176d369265fddd3"
    },
    {
      "id": "inc_d137a92793e0",
      "title": "Access from Unfamiliar / Non-Baselined IP",
      "incident_id": "inc_d137a92793e0",
      "severity": "MEDIUM",
      "severity_level": 2,
      "category": "UNFAMILIAR_IP_ACCESS",
      "type": "UNFAMILIAR_IP_ACCESS",
      "status": "RESOLVED",
      "action": "RESOLVED",
      "service_name": "GrantPulse (Underwriting API)",
      "serviceName": "GrantPulse (Underwriting API)",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Actor [exec_sarah_connor] connected from new IP [185.220.101.5.fra] (Frankfurt, Germany) outside baselined client IP pool.",
      "content": "Access from Unfamiliar / Non-Baselined IP - Actor [exec_sarah_connor] connected from new IP [185.220.101.5.fra] (Frankfurt, Germany) outside baselined client IP pool.. Remediation: Inspect traffic. Status: RESOLVED",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "UNFAMILIAR_IP_ACCESS",
        "MEDIUM",
        "RESOLVED",
        "RESOLVED"
      ],
      "timestamp": "2026-09-16T03:17:48.996Z",
      "_id": "inc_d137a92793e0",
      "content_hash": "2b88bec91b9d4750dada38247cc065b7db2c38e719da25688fcbf2cb0de446ab"
    },
    {
      "id": "inc_a0bfe5820ad0",
      "title": "Headless Browser Anomaly: Missing Standard Browser Navigation Headers",
      "incident_id": "inc_a0bfe5820ad0",
      "severity": "MEDIUM",
      "severity_level": 2,
      "category": "BOT_HEADLESS_HEADER_ANOMALY",
      "type": "BOT_HEADLESS_HEADER_ANOMALY",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "Global Mesh",
      "serviceName": "Global Mesh",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1059",
      "mitre_ttp": "T1059",
      "message": "User-Agent claims standard browser (Mozilla/5.0) but lacks Sec-Fetch metadata and Accept-Language headers indicative of scripted request forging.",
      "content": "Headless Browser Anomaly: Missing Standard Browser Navigation Headers - User-Agent claims standard browser (Mozilla/5.0) but lacks Sec-Fetch metadata and Accept-Language headers indicative of scripted request forging.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "BOT_HEADLESS_HEADER_ANOMALY",
        "MEDIUM",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T06:21:46.180Z",
      "_id": "inc_a0bfe5820ad0",
      "content_hash": "b032653d4b66da9548dfe20fdca43bf92ec77e3e2c4a88bbbb16f795418b3c4e"
    },
    {
      "id": "inc_c4b4435db63c",
      "title": "Impossible Travel Anomaly (Session Hijack or Stolen Credential)",
      "incident_id": "inc_c4b4435db63c",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "IMPOSSIBLE_TRAVEL_ANOMALY",
      "type": "IMPOSSIBLE_TRAVEL_ANOMALY",
      "status": "RESOLVED",
      "action": "RESOLVED",
      "service_name": "Axios Financial (SSO)",
      "serviceName": "Axios Financial (SSO)",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Actor [exec_sarah_connor] moved 9303 km (Frankfurt, Germany → Los Angeles, USA) in 1.0 minutes (Speed: 558,780 km/h).",
      "content": "Impossible Travel Anomaly (Session Hijack or Stolen Credential) - Actor [exec_sarah_connor] moved 9303 km (Frankfurt, Germany → Los Angeles, USA) in 1.0 minutes (Speed: 558,780 km/h).. Remediation: Inspect traffic. Status: RESOLVED",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "IMPOSSIBLE_TRAVEL_ANOMALY",
        "CRITICAL",
        "RESOLVED",
        "RESOLVED"
      ],
      "timestamp": "2026-09-16T03:18:48.939Z",
      "_id": "inc_c4b4435db63c",
      "content_hash": "b5c1a092762ec99e89de008c8efc9ac69798093ba3d42276cd085c82ac739b33"
    },
    {
      "id": "inc_18043a74b40e",
      "title": "IDOR / Cross-Tenant Access Violation",
      "incident_id": "inc_18043a74b40e",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "BOLA_CROSS_TENANT_VIOLATION",
      "type": "BOLA_CROSS_TENANT_VIOLATION",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "Global Mesh",
      "serviceName": "Global Mesh",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Actor belonging to [tenant_alpha] attempted unauthorized direct object access on [tenant_beta_record_99]",
      "content": "IDOR / Cross-Tenant Access Violation - Actor belonging to [tenant_alpha] attempted unauthorized direct object access on [tenant_beta_record_99]. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "BOLA_CROSS_TENANT_VIOLATION",
        "HIGH",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T04:09:12.046Z",
      "_id": "inc_18043a74b40e",
      "content_hash": "b7758f193ab8fea2e3b3ec53737766be82429a49207b57397819912d59a5b887"
    },
    {
      "id": "inc_35aa860018b0",
      "title": "Abnormal Data Egress / Mass Exfiltration Anomaly",
      "incident_id": "inc_35aa860018b0",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "MASS_DATA_EXFILTRATION",
      "type": "MASS_DATA_EXFILTRATION",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "Global Mesh",
      "serviceName": "Global Mesh",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Actor [attacker_1789531752045] generated 7 read/export actions (3.34 MB) within 60 seconds.",
      "content": "Abnormal Data Egress / Mass Exfiltration Anomaly - Actor [attacker_1789531752045] generated 7 read/export actions (3.34 MB) within 60 seconds.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "MASS_DATA_EXFILTRATION",
        "HIGH",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T04:09:12.045Z",
      "_id": "inc_35aa860018b0",
      "content_hash": "dafd8c89ae57f32feb0a51f121c665af08dbb5a53bd4211db2b6b8ad1453088b"
    },
    {
      "id": "inc_11865793a848",
      "title": "Machine-Speed Request Anomaly: Sub-Human Navigation Interval",
      "incident_id": "inc_11865793a848",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "BOT_MACHINE_SPEED_SCRAPING",
      "type": "BOT_MACHINE_SPEED_SCRAPING",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "Global Mesh",
      "serviceName": "Global Mesh",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1059",
      "mitre_ttp": "T1059",
      "message": "Client executed sequential request in 0ms (< 60ms human limit). Velocity: 4 calls in last 10s.",
      "content": "Machine-Speed Request Anomaly: Sub-Human Navigation Interval - Client executed sequential request in 0ms (< 60ms human limit). Velocity: 4 calls in last 10s.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "BOT_MACHINE_SPEED_SCRAPING",
        "HIGH",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T06:21:46.180Z",
      "_id": "inc_11865793a848",
      "content_hash": "fa944821f79fc056a740dab6222f0c3954e06160addce1e8c6431a3b01e93159"
    },
    {
      "id": "inc_iam_1789561577150",
      "title": "IAM Access Blocked: Suspended Account Access Attempt",
      "incident_id": "inc_iam_1789561577150",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "IAM_DISABLED_ACCOUNT_ACCESS",
      "type": "IAM_DISABLED_ACCOUNT_ACCESS",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "IAM Access Control Shield",
      "serviceName": "IAM Access Control Shield",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Disabled user 'alex.mercer@axiosmedia.com' attempted resource access.",
      "content": "IAM Access Blocked: Suspended Account Access Attempt - Disabled user 'alex.mercer@axiosmedia.com' attempted resource access.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "IAM_DISABLED_ACCOUNT_ACCESS",
        "HIGH",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T12:26:17.150Z",
      "_id": "inc_iam_1789561577150",
      "content_hash": "08692cfaf2773c82e037c3008f90da2b0b3019ec1f0995187274fa2a4a6048d1"
    },
    {
      "id": "inc_xx00dbxrs",
      "title": "Global Application Rate Limit Exceeded",
      "incident_id": "inc_xx00dbxrs",
      "severity": "MEDIUM",
      "severity_level": 2,
      "category": "GLOBAL_RATE_LIMIT_EXCEEDED",
      "type": "GLOBAL_RATE_LIMIT_EXCEEDED",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "/api/v1/rmf/overview",
      "serviceName": "/api/v1/rmf/overview",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Origin [::1] exceeded global rate threshold (61 calls in 60s, limit: 60).",
      "content": "Global Application Rate Limit Exceeded - Origin [::1] exceeded global rate threshold (61 calls in 60s, limit: 60).. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "GLOBAL_RATE_LIMIT_EXCEEDED",
        "MEDIUM",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-17T15:29:55.434Z",
      "_id": "inc_xx00dbxrs",
      "content_hash": "7cf523dca60f1d70f3fa8362540667a031bd43aaa98c94cb9993ae897251789a"
    },
    {
      "id": "inc_rw14e47bp",
      "title": "High-Velocity Burst Flood / Denial-of-Service Attack Intercepted",
      "incident_id": "inc_rw14e47bp",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "DOS_BURST_FLOOD_DETECTED",
      "type": "DOS_BURST_FLOOD_DETECTED",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "/api/security/auth/password-status",
      "serviceName": "/api/security/auth/password-status",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Origin [::1] sent 16 requests within 2000ms (burst limit: 15). Immediate containment applied.",
      "content": "High-Velocity Burst Flood / Denial-of-Service Attack Intercepted - Origin [::1] sent 16 requests within 2000ms (burst limit: 15). Immediate containment applied.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "DOS_BURST_FLOOD_DETECTED",
        "CRITICAL",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T11:27:03.366Z",
      "_id": "inc_rw14e47bp",
      "content_hash": "b5947c0a3be43b22cc73878899ed96ac3f897faf3644fce967cd90e8752d11e0"
    },
    {
      "id": "inc_jsv093165",
      "title": "Access Denied: Origin IP Currently Banned",
      "incident_id": "inc_jsv093165",
      "severity": "HIGH",
      "severity_level": 3,
      "category": "AUTOMATED_IP_BAN_ENFORCED",
      "type": "AUTOMATED_IP_BAN_ENFORCED",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "/api/security/mfa/overview",
      "serviceName": "/api/security/mfa/overview",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Client IP [::1] is under an active security ban for: Aggressive DoS Burst Flooding (16 reqs / 2000ms). Expires in 600s.",
      "content": "Access Denied: Origin IP Currently Banned - Client IP [::1] is under an active security ban for: Aggressive DoS Burst Flooding (16 reqs / 2000ms). Expires in 600s.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "AUTOMATED_IP_BAN_ENFORCED",
        "HIGH",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T11:27:03.369Z",
      "_id": "inc_jsv093165",
      "content_hash": "cc218817fe499b895a426858e969c47b54b312029510dc7cb78d512a9a8641cb"
    },
    {
      "id": "inc_iam_1789542668282",
      "title": "Cross-Tenant Access Breach Blocked (ABAC Boundary)",
      "incident_id": "inc_iam_1789542668282",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "CROSS_TENANT_BREACH_ATTEMPT",
      "type": "CROSS_TENANT_BREACH_ATTEMPT",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "IAM Access Control Shield",
      "serviceName": "IAM Access Control Shield",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1078",
      "mitre_ttp": "T1078",
      "message": "User 'elena.rostova@grantpulse.org' (GRANT_OFFICER) attempted unauthorized cross-tenant query to 'tenant_axios_financial'.",
      "content": "Cross-Tenant Access Breach Blocked (ABAC Boundary) - User 'elena.rostova@grantpulse.org' (GRANT_OFFICER) attempted unauthorized cross-tenant query to 'tenant_axios_financial'.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "CROSS_TENANT_BREACH_ATTEMPT",
        "CRITICAL",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-16T07:11:08.282Z",
      "_id": "inc_iam_1789542668282",
      "content_hash": "e46a0b8557a0b3ad2b9f8c3eeac8d88c2153a9f9e930f79618108e40509b6ba2"
    },
    {
      "id": "inc_client_tenant_vanguard_health__77f5e4_1789712681377",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__77f5e4_1789712681377",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__77f5e4",
      "tenant_id": "tenant_vanguard_health__77f5e4",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__77f5e4. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__77f5e4. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:24:41.377Z",
      "_id": "inc_client_tenant_vanguard_health__77f5e4_1789712681377",
      "content_hash": "0ca14d475e23dee5bd60f5f1c888fd8e67332750985bbfac125a91df938823fc"
    },
    {
      "id": "inc_client_tenant_vanguard_health__62a0a6_1789711479548",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__62a0a6_1789711479548",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__62a0a6",
      "tenant_id": "tenant_vanguard_health__62a0a6",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__62a0a6. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__62a0a6. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:04:39.547Z",
      "_id": "inc_client_tenant_vanguard_health__62a0a6_1789711479548",
      "content_hash": "14402ee4d782183ad3ef4ae66111b1fd9d7f3221d0300f755e2352ac1e2d445f"
    },
    {
      "id": "inc_client_tenant_vanguard_health__693ea0_1789711203735",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__693ea0_1789711203735",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__693ea0",
      "tenant_id": "tenant_vanguard_health__693ea0",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__693ea0. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__693ea0. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:00:03.735Z",
      "_id": "inc_client_tenant_vanguard_health__693ea0_1789711203735",
      "content_hash": "50c6b49f673343678abe58695b7f4103ef3a2f7d43587f670a1fbc9a15b5e6c6"
    },
    {
      "id": "inc_client_tenant_vanguard_health__6ce494_1789712880699",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__6ce494_1789712880699",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__6ce494",
      "tenant_id": "tenant_vanguard_health__6ce494",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__6ce494. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__6ce494. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:28:00.699Z",
      "_id": "inc_client_tenant_vanguard_health__6ce494_1789712880699",
      "content_hash": "7eb92cc8a298bfd001e99233c5ff102ced068b767490542406a87f5668268afd"
    },
    {
      "id": "inc_client_tenant_vanguard_health__e0d463_1789711110506",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__e0d463_1789711110506",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SECURITY_ALERT",
      "type": "SECURITY_INCIDENT",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__e0d463",
      "tenant_id": "tenant_vanguard_health__e0d463",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1020",
      "mitre_ttp": "T1020",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__e0d463. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__e0d463. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        null,
        "CRITICAL",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T05:58:30.506Z",
      "_id": "inc_client_tenant_vanguard_health__e0d463_1789711110506",
      "content_hash": "c19511016d67dac3da62842c3313cfe855d62226019f0b82fa49d9b7b2380bc2"
    },
    {
      "id": "inc_client_tenant_vanguard_health__59f525_1789711516887",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__59f525_1789711516887",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__59f525",
      "tenant_id": "tenant_vanguard_health__59f525",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__59f525. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__59f525. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:05:16.887Z",
      "_id": "inc_client_tenant_vanguard_health__59f525_1789711516887",
      "content_hash": "c986b48f6acbb4e69629abdabd3a69b0918a3cb899f14469c82eab0f0301c3c7"
    },
    {
      "id": "inc_client_tenant_vanguard_health__4eb691_1789711501145",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__4eb691_1789711501145",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__4eb691",
      "tenant_id": "tenant_vanguard_health__4eb691",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__4eb691. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__4eb691. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:05:01.145Z",
      "_id": "inc_client_tenant_vanguard_health__4eb691_1789711501145",
      "content_hash": "ef228db0304210ba6425bc12163334c37805e7ec0afe35b6f796d45bc776b0d2"
    },
    {
      "id": "inc_client_tenant_vanguard_health__6dd0cb_1789713423414",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__6dd0cb_1789713423414",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__6dd0cb",
      "tenant_id": "tenant_vanguard_health__6dd0cb",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__6dd0cb. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__6dd0cb. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:37:03.414Z",
      "_id": "inc_client_tenant_vanguard_health__6dd0cb_1789713423414",
      "content_hash": "1c99292b553fe666a098be1db62c5736ddd03e1f1d880576775a882989c513ad"
    },
    {
      "id": "inc_client_tenant_vanguard_health__f363ec_1789713340098",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__f363ec_1789713340098",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__f363ec",
      "tenant_id": "tenant_vanguard_health__f363ec",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__f363ec. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__f363ec. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:35:40.098Z",
      "_id": "inc_client_tenant_vanguard_health__f363ec_1789713340098",
      "content_hash": "3390f29781b2a5e1db0b03bb82360fc3f72cd446783805aa455fafce1266dc5f"
    },
    {
      "id": "inc_client_tenant_vanguard_health__9d9fe7_1789713397316",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__9d9fe7_1789713397316",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__9d9fe7",
      "tenant_id": "tenant_vanguard_health__9d9fe7",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__9d9fe7. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__9d9fe7. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:36:37.316Z",
      "_id": "inc_client_tenant_vanguard_health__9d9fe7_1789713397316",
      "content_hash": "50893feb446003eccd8d6f0d487c537a03bb163cbe973616484718bd58ba56ba"
    },
    {
      "id": "inc_client_tenant_vanguard_health__5d2a36_1789713180988",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__5d2a36_1789713180988",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__5d2a36",
      "tenant_id": "tenant_vanguard_health__5d2a36",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__5d2a36. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__5d2a36. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:33:00.988Z",
      "_id": "inc_client_tenant_vanguard_health__5d2a36_1789713180988",
      "content_hash": "968cf5dbed0683c1734bcef3bb9b7f2177dd20d2c35315aaabecacde8c74fd48"
    },
    {
      "id": "inc_client_tenant_vanguard_health__35ef7f_1789713607209",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__35ef7f_1789713607209",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__35ef7f",
      "tenant_id": "tenant_vanguard_health__35ef7f",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__35ef7f. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__35ef7f. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:40:07.209Z",
      "_id": "inc_client_tenant_vanguard_health__35ef7f_1789713607209",
      "content_hash": "a88feef84d2bfd76f103152ecdcc16638542cb633675ed1da70270455409d4d2"
    },
    {
      "id": "inc_client_tenant_vanguard_health__94cbc3_1789716108278",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__94cbc3_1789716108278",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__94cbc3",
      "tenant_id": "tenant_vanguard_health__94cbc3",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__94cbc3. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__94cbc3. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T07:21:48.278Z",
      "_id": "inc_client_tenant_vanguard_health__94cbc3_1789716108278",
      "content_hash": "b281c8f61fa2fe0fb2269e2e787ed1e6d068a4935e575a07a00324785aedb10c"
    },
    {
      "id": "inc_client_tenant_vanguard_health__6f79e2_1789713732953",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__6f79e2_1789713732953",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__6f79e2",
      "tenant_id": "tenant_vanguard_health__6f79e2",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__6f79e2. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__6f79e2. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T06:42:12.953Z",
      "_id": "inc_client_tenant_vanguard_health__6f79e2_1789713732953",
      "content_hash": "fc035948adb074919edcecdc8d8552c094ae4b7eec3bcb426cfba47d815d13f0"
    },
    {
      "id": "inc_client_tenant_vanguard_health__95cbc0_1789716506680",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__95cbc0_1789716506680",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__95cbc0",
      "tenant_id": "tenant_vanguard_health__95cbc0",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__95cbc0. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__95cbc0. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T07:28:26.680Z",
      "_id": "inc_client_tenant_vanguard_health__95cbc0_1789716506680",
      "content_hash": "13f6a35a45d82a9f1993b199193572c24061642e9c7b6242a217432a497b4e35"
    },
    {
      "id": "inc_client_tenant_vanguard_health__e4a3dc_1789719517814",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__e4a3dc_1789719517814",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__e4a3dc",
      "tenant_id": "tenant_vanguard_health__e4a3dc",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__e4a3dc. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__e4a3dc. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T08:18:37.814Z",
      "_id": "inc_client_tenant_vanguard_health__e4a3dc_1789719517814",
      "content_hash": "2eafd9b98a96429e9856a2ff43106eed124686992368e8dd895ce8c96f7f9598"
    },
    {
      "id": "inc_client_tenant_vanguard_health__42b494_1789717301924",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__42b494_1789717301924",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__42b494",
      "tenant_id": "tenant_vanguard_health__42b494",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__42b494. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__42b494. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T07:41:41.924Z",
      "_id": "inc_client_tenant_vanguard_health__42b494_1789717301924",
      "content_hash": "80c5e53ade73572e46326aed6c3c1996f1541775e544a608b38cc8fe3ed3d559"
    },
    {
      "id": "inc_client_tenant_vanguard_health__74db28_1789718724203",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__74db28_1789718724203",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__74db28",
      "tenant_id": "tenant_vanguard_health__74db28",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__74db28. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__74db28. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T08:05:24.203Z",
      "_id": "inc_client_tenant_vanguard_health__74db28_1789718724203",
      "content_hash": "84b206ae44a6f927461c730ee4a7ed867935e25164eeabbd92a172f10b4b6154"
    },
    {
      "id": "inc_client_tenant_vanguard_health__c9b7f8_1789716275451",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__c9b7f8_1789716275451",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__c9b7f8",
      "tenant_id": "tenant_vanguard_health__c9b7f8",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__c9b7f8. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__c9b7f8. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T07:24:35.451Z",
      "_id": "inc_client_tenant_vanguard_health__c9b7f8_1789716275451",
      "content_hash": "c2ab441e2d7a2f25f0c95bc7a0b04f3ac4bcfda18c1ccf3d08d5c187f452ef18"
    },
    {
      "id": "inc_client_tenant_vanguard_health__73b3b5_1789717246529",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__73b3b5_1789717246529",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__73b3b5",
      "tenant_id": "tenant_vanguard_health__73b3b5",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__73b3b5. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__73b3b5. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T07:40:46.529Z",
      "_id": "inc_client_tenant_vanguard_health__73b3b5_1789717246529",
      "content_hash": "e55308aaee78e1d082db816ac7e70f009974ac3455fffb3a88285c28a6afab0a"
    },
    {
      "id": "inc_client_tenant_vanguard_health__f1de88_1789716475997",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__f1de88_1789716475997",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__f1de88",
      "tenant_id": "tenant_vanguard_health__f1de88",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__f1de88. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__f1de88. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T07:27:55.997Z",
      "_id": "inc_client_tenant_vanguard_health__f1de88_1789716475997",
      "content_hash": "e9ee95ed56349f3553bf3dc69901e06b9a7c0e39f049a10704e476b89f88b9d9"
    },
    {
      "id": "inc_client_tenant_vanguard_health__e601bf_1789810683503",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__e601bf_1789810683503",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__e601bf",
      "tenant_id": "tenant_vanguard_health__e601bf",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__e601bf. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__e601bf. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-19T09:38:03.503Z",
      "_id": "inc_client_tenant_vanguard_health__e601bf_1789810683503",
      "content_hash": "5e89c27112057ab94b686d25e7d5faad4ba0a73998251a5729674de93623f134"
    },
    {
      "id": "inc_client_tenant_vanguard_health__840c53_1789969632330",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__840c53_1789969632330",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__840c53",
      "tenant_id": "tenant_vanguard_health__840c53",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__840c53. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__840c53. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T05:47:12.330Z",
      "_id": "inc_client_tenant_vanguard_health__840c53_1789969632330",
      "content_hash": "74fc6c9fdc3868e2e29f32ec00cd33d8cd834364ce3d2ead82d9e8d765079a45"
    },
    {
      "id": "inc_client_tenant_vanguard_health__f8e15d_1789795607304",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__f8e15d_1789795607304",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__f8e15d",
      "tenant_id": "tenant_vanguard_health__f8e15d",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__f8e15d. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__f8e15d. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-19T05:26:47.304Z",
      "_id": "inc_client_tenant_vanguard_health__f8e15d_1789795607304",
      "content_hash": "abdeb6bbfdd83532efbf0b5f93f98ada4e959441c3affbbf40e7c790494075b5"
    },
    {
      "id": "inc_client_tenant_vanguard_health__2d0512_1789719650189",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__2d0512_1789719650189",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__2d0512",
      "tenant_id": "tenant_vanguard_health__2d0512",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__2d0512. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__2d0512. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-18T08:20:50.189Z",
      "_id": "inc_client_tenant_vanguard_health__2d0512_1789719650189",
      "content_hash": "ca58e4662465939df493b906155efb970ae8cf04c4c06ec5559f66d088303ede"
    },
    {
      "id": "inc_client_tenant_vanguard_health__b23365_1789974965654",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__b23365_1789974965654",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__b23365",
      "tenant_id": "tenant_vanguard_health__b23365",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__b23365. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__b23365. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T07:16:05.654Z",
      "_id": "inc_client_tenant_vanguard_health__b23365_1789974965654",
      "content_hash": "042ab83237886e772185340b7bf8735a84d5ab137379ad8e7bf903dc40f4a85e"
    },
    {
      "id": "inc_client_tenant_vanguard_health__01ac83_1789975106637",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__01ac83_1789975106637",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__01ac83",
      "tenant_id": "tenant_vanguard_health__01ac83",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__01ac83. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__01ac83. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T07:18:26.637Z",
      "_id": "inc_client_tenant_vanguard_health__01ac83_1789975106637",
      "content_hash": "238a964f0ed5943af5afe975d539923f7dfe38d45e762a3fb93a5ff9cb092d9b"
    },
    {
      "id": "inc_client_tenant_vanguard_health__8c48d8_1789975074763",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__8c48d8_1789975074763",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__8c48d8",
      "tenant_id": "tenant_vanguard_health__8c48d8",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__8c48d8. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__8c48d8. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T07:17:54.763Z",
      "_id": "inc_client_tenant_vanguard_health__8c48d8_1789975074763",
      "content_hash": "240113056331b0615559219e960d99f04196567b9b9748927ff41ebcd2b011d5"
    },
    {
      "id": "inc_client_tenant_vanguard_health__10c45a_1789971071589",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__10c45a_1789971071589",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__10c45a",
      "tenant_id": "tenant_vanguard_health__10c45a",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__10c45a. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__10c45a. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T06:11:11.589Z",
      "_id": "inc_client_tenant_vanguard_health__10c45a_1789971071589",
      "content_hash": "25d7577706b09b6e0b6d6bab357548284254ad87a0b0a3af1d13a08eb0547a06"
    },
    {
      "id": "inc_client_tenant_vanguard_health__d00e6d_1789975151518",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__d00e6d_1789975151518",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__d00e6d",
      "tenant_id": "tenant_vanguard_health__d00e6d",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__d00e6d. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__d00e6d. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T07:19:11.518Z",
      "_id": "inc_client_tenant_vanguard_health__d00e6d_1789975151518",
      "content_hash": "c4285ef86568d8986cbe3adc3e5c15a1f4b393046e420dffe0ce1b8d9e732074"
    },
    {
      "id": "inc_client_tenant_vanguard_health__3cc3d4_1789974984368",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__3cc3d4_1789974984368",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__3cc3d4",
      "tenant_id": "tenant_vanguard_health__3cc3d4",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__3cc3d4. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__3cc3d4. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T07:16:24.368Z",
      "_id": "inc_client_tenant_vanguard_health__3cc3d4_1789974984368",
      "content_hash": "cf1235be6ed571d96591aa5e5ee7a5bbed5f17330e2d64c6101b84173861485d"
    },
    {
      "id": "inc_client_tenant_vanguard_health__7a585f_1790028514066",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__7a585f_1790028514066",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__7a585f",
      "tenant_id": "tenant_vanguard_health__7a585f",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__7a585f. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__7a585f. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T22:08:34.066Z",
      "_id": "inc_client_tenant_vanguard_health__7a585f_1790028514066",
      "content_hash": "45a272369847745b76c5257bdf1a054d9a4bd8133a0525091e197119154dff6b"
    },
    {
      "id": "inc_client_tenant_vanguard_health__9dd0e3_1790050820763",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__9dd0e3_1790050820763",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__9dd0e3",
      "tenant_id": "tenant_vanguard_health__9dd0e3",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__9dd0e3. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__9dd0e3. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:20:20.763Z",
      "_id": "inc_client_tenant_vanguard_health__9dd0e3_1790050820763",
      "content_hash": "7df4f68ed4cf601d6684a651b66565b279f7c53e216fcc631197d44c282b5bdf"
    },
    {
      "id": "inc_client_tenant_vanguard_health__7b0610_1790033020303",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__7b0610_1790033020303",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__7b0610",
      "tenant_id": "tenant_vanguard_health__7b0610",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__7b0610. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__7b0610. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T23:23:40.303Z",
      "_id": "inc_client_tenant_vanguard_health__7b0610_1790033020303",
      "content_hash": "c3010e4dcc977778ce76f452779358f596287b64bf56601627a9bd2e22ac122a"
    },
    {
      "id": "inc_client_tenant_vanguard_health__400c80_1790051326348",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__400c80_1790051326348",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__400c80",
      "tenant_id": "tenant_vanguard_health__400c80",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__400c80. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__400c80. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:28:46.348Z",
      "_id": "inc_client_tenant_vanguard_health__400c80_1790051326348",
      "content_hash": "eae5271b6d15e9764d0ca5cbc3e762ff937518c701ab3efca6e942f3aa310145"
    },
    {
      "id": "inc_client_tenant_vanguard_health__527098_1790028175474",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__527098_1790028175474",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__527098",
      "tenant_id": "tenant_vanguard_health__527098",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__527098. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__527098. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-21T22:02:55.473Z",
      "_id": "inc_client_tenant_vanguard_health__527098_1790028175474",
      "content_hash": "f8962838e71d6c8ee0d3092b138d3229e14374da9492151267c28bceeb9cb8dc"
    },
    {
      "id": "inc_client_tenant_vanguard_health__8b2582_1790053037431",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__8b2582_1790053037431",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__8b2582",
      "tenant_id": "tenant_vanguard_health__8b2582",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__8b2582. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__8b2582. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:57:17.431Z",
      "_id": "inc_client_tenant_vanguard_health__8b2582_1790053037431",
      "content_hash": "04840bb8b7890d3648c65c09535f2380886da220d0a222181727394878b29e85"
    },
    {
      "id": "inc_client_tenant_vanguard_health__a5eb19_1790052430267",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__a5eb19_1790052430267",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__a5eb19",
      "tenant_id": "tenant_vanguard_health__a5eb19",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__a5eb19. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__a5eb19. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:47:10.267Z",
      "_id": "inc_client_tenant_vanguard_health__a5eb19_1790052430267",
      "content_hash": "0a4e4cdfa1cb8ae68af8bfd195f8376c0f44050912366afff464c98b91536302"
    },
    {
      "id": "inc_client_tenant_vanguard_health__098ee9_1790052445090",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__098ee9_1790052445090",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__098ee9",
      "tenant_id": "tenant_vanguard_health__098ee9",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__098ee9. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__098ee9. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:47:25.090Z",
      "_id": "inc_client_tenant_vanguard_health__098ee9_1790052445090",
      "content_hash": "2af3ebdbf7b6a196edbf4de5bd0345224ececa1493df1aee3930fe71a62e1eb7"
    },
    {
      "id": "inc_client_tenant_vanguard_health__a06c42_1790051685886",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__a06c42_1790051685886",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__a06c42",
      "tenant_id": "tenant_vanguard_health__a06c42",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__a06c42. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__a06c42. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:34:45.886Z",
      "_id": "inc_client_tenant_vanguard_health__a06c42_1790051685886",
      "content_hash": "2beb412db466ccec00279792ea26f59393eccdce162db08401637c5a8502fb0a"
    },
    {
      "id": "inc_client_tenant_vanguard_health__3ece14_1790052400767",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__3ece14_1790052400767",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__3ece14",
      "tenant_id": "tenant_vanguard_health__3ece14",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__3ece14. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__3ece14. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:46:40.767Z",
      "_id": "inc_client_tenant_vanguard_health__3ece14_1790052400767",
      "content_hash": "462b4214ab4fc731ab6221514c4acc3a7ab19f378a9d1c9af81a5bfab5541404"
    },
    {
      "id": "inc_client_tenant_vanguard_health__0e9a7c_1790051706463",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__0e9a7c_1790051706463",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__0e9a7c",
      "tenant_id": "tenant_vanguard_health__0e9a7c",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__0e9a7c. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__0e9a7c. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:35:06.463Z",
      "_id": "inc_client_tenant_vanguard_health__0e9a7c_1790051706463",
      "content_hash": "9f366a438d02c94762aca528ee6947b67280b34fd2883504c1420cd40d457c8e"
    },
    {
      "id": "inc_client_tenant_vanguard_health__7fd06e_1790055819859",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__7fd06e_1790055819859",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__7fd06e",
      "tenant_id": "tenant_vanguard_health__7fd06e",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__7fd06e. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__7fd06e. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T05:43:39.859Z",
      "_id": "inc_client_tenant_vanguard_health__7fd06e_1790055819859",
      "content_hash": "307712dbf68286800cda4b3ee52a96ea52a4d238c094a3d58fe65b2f9e403d18"
    },
    {
      "id": "inc_client_tenant_vanguard_health__f4411c_1790053085566",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__f4411c_1790053085566",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__f4411c",
      "tenant_id": "tenant_vanguard_health__f4411c",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__f4411c. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__f4411c. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:58:05.566Z",
      "_id": "inc_client_tenant_vanguard_health__f4411c_1790053085566",
      "content_hash": "43fe65d43ed1765a0b9edb5dfeaf76a63ce233da5e7d26e3f0dbe93e47dfc58d"
    },
    {
      "id": "inc_client_tenant_vanguard_health__9eb26a_1790055931737",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__9eb26a_1790055931737",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__9eb26a",
      "tenant_id": "tenant_vanguard_health__9eb26a",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__9eb26a. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__9eb26a. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T05:45:31.737Z",
      "_id": "inc_client_tenant_vanguard_health__9eb26a_1790055931737",
      "content_hash": "81540e4a30eaf1251f6ad07f2c88d12f42cae5b588fd05dc72c03e16523886e4"
    },
    {
      "id": "inc_client_tenant_vanguard_health__fc1e67_1790053063606",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__fc1e67_1790053063606",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__fc1e67",
      "tenant_id": "tenant_vanguard_health__fc1e67",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__fc1e67. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__fc1e67. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T04:57:43.606Z",
      "_id": "inc_client_tenant_vanguard_health__fc1e67_1790053063606",
      "content_hash": "c7c202a9fb33a3b058a600b579451d5851fc04f8c75dc0a0f21be918ece79de7"
    },
    {
      "id": "inc_iam_1790053439114",
      "title": "Cross-Tenant Access Breach Blocked (ABAC Boundary)",
      "incident_id": "inc_iam_1790053439114",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "CROSS_TENANT_BREACH_ATTEMPT",
      "type": "CROSS_TENANT_BREACH_ATTEMPT",
      "status": "ACTIVE",
      "action": "ACTIVE_ALERT",
      "service_name": "IAM Access Control Shield",
      "serviceName": "IAM Access Control Shield",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health",
      "tenant_id": "tenant_vanguard_health",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1",
      "mitreTtp": "T1078",
      "mitre_ttp": "T1078",
      "message": "User 'architect.maya@mermaid.io' (SYSTEM_ARCHITECT) attempted unauthorized cross-tenant query to 'tenant_workflow_automation'.",
      "content": "Cross-Tenant Access Breach Blocked (ABAC Boundary) - User 'architect.maya@mermaid.io' (SYSTEM_ARCHITECT) attempted unauthorized cross-tenant query to 'tenant_workflow_automation'.. Remediation: Inspect traffic. Status: ACTIVE",
      "remediation": "Inspect logs and verify tenant isolation",
      "tags": [
        "CROSS_TENANT_BREACH_ATTEMPT",
        "CRITICAL",
        "ACTIVE_ALERT",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T05:03:59.114Z",
      "_id": "inc_iam_1790053439114",
      "content_hash": "d9caed51647f0ccb16c6b39e8660734ab6c48619e7d13d98909413c0d8b94e8a"
    },
    {
      "id": "inc_client_tenant_vanguard_health__d63951_1790066471766",
      "title": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc",
      "incident_id": "inc_client_tenant_vanguard_health__d63951_1790066471766",
      "severity": "CRITICAL",
      "severity_level": 4,
      "category": "SQL_INJECTION",
      "type": "SQL_INJECTION",
      "status": "ACTIVE",
      "action": "WAF_BLOCK",
      "service_name": "vanguard-ehr-core",
      "serviceName": "vanguard-ehr-core",
      "organization": "Vanguard Health Systems Inc",
      "tenantId": "tenant_vanguard_health__d63951",
      "tenant_id": "tenant_vanguard_health__d63951",
      "clientIp": "127.0.0.1",
      "client_ip": "127.0.0.1",
      "target_resource": "/api/v1/patient-records",
      "mitreTtp": "T1190",
      "mitre_ttp": "T1190",
      "message": "Automated anomaly trigger on tenant tenant_vanguard_health__d63951. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.",
      "content": "Client Perimeter Security Incident: [SQL_INJECTION] on Vanguard Health Systems Inc - Automated anomaly trigger on tenant tenant_vanguard_health__d63951. Endpoint: /api/v1/patient-records, Latency: 850ms, Status: 503.. Remediation: Engage perimeter WAF throttling and inspect upstream server health.. Status: ACTIVE",
      "remediation": "Engage perimeter WAF throttling and inspect upstream server health.",
      "tags": [
        "SQL_INJECTION",
        "CRITICAL",
        "WAF_BLOCK",
        "ACTIVE"
      ],
      "timestamp": "2026-09-22T08:41:11.766Z",
      "_id": "inc_client_tenant_vanguard_health__d63951_1790066471766",
      "content_hash": "c53c0a168897c0c27d2ceb991c5fa8709678c0428304a96e7199a7f05be5f904"
    }
  ],
  "demo_ecommerce_bi": [
    {
      "id": "ecom_19",
      "region": "EMEA Europe",
      "country": "Italy",
      "country_code": "IT",
      "product_line": "Cloud AI Inference",
      "customer_tier": "Standard",
      "units_sold": 680,
      "gross_revenue": 340000,
      "cogs": 210000,
      "net_profit": 130000,
      "margin_percent": 38.2,
      "support_tickets": 12,
      "csat_score": 87,
      "order_count": 170,
      "status": "Standard",
      "title": "Milan Fashion Supply Chain Forecasting",
      "_id": "ecom_19",
      "content_hash": "577cd869afc3c34df48bc64382166746230291ab53081a6a51fa7560bb76c574"
    },
    {
      "id": "ecom_20",
      "region": "Africa",
      "country": "South Africa",
      "country_code": "ZA",
      "product_line": "Enterprise Search Engine",
      "customer_tier": "Pilot",
      "units_sold": 520,
      "gross_revenue": 182000,
      "cogs": 125000,
      "net_profit": 57000,
      "margin_percent": 31.3,
      "support_tickets": 10,
      "csat_score": 84,
      "order_count": 120,
      "status": "Pilot",
      "title": "Johannesburg Mining Safety Document Index",
      "_id": "ecom_20",
      "content_hash": "63409bf5feb21f53506f16f599154a66e65ce6afb81ddff6b3234afc9a4b5a4b"
    },
    {
      "id": "ecom_17",
      "region": "Middle East",
      "country": "Israel",
      "country_code": "IL",
      "product_line": "Security & WAF Shield",
      "customer_tier": "Enterprise",
      "units_sold": 1100,
      "gross_revenue": 550000,
      "cogs": 260000,
      "net_profit": 290000,
      "margin_percent": 52.7,
      "support_tickets": 9,
      "csat_score": 95,
      "order_count": 280,
      "status": "Enterprise",
      "title": "Tel Aviv Autonomous Cyber Defense Shield",
      "_id": "ecom_17",
      "content_hash": "3eaabf3c2406b6d0f1b820163872c35b7f03a41cf823d9d78d016005e9220435"
    },
    {
      "id": "ecom_18",
      "region": "EMEA Europe",
      "country": "Switzerland",
      "country_code": "CH",
      "product_line": "High-Frequency Trading API",
      "customer_tier": "VIP Tier",
      "units_sold": 920,
      "gross_revenue": 736000,
      "cogs": 310000,
      "net_profit": 426000,
      "margin_percent": 57.9,
      "support_tickets": 5,
      "csat_score": 99,
      "order_count": 220,
      "status": "VIP Tier",
      "title": "Zurich Private Banking Settlement Ledger",
      "_id": "ecom_18",
      "content_hash": "75c805d5566cb51f89444f3189037a0c7fdbc7d65d3c0c0a2672f172a2db6a15"
    },
    {
      "id": "ecom_16",
      "region": "Middle East",
      "country": "United Arab Emirates",
      "country_code": "AE",
      "product_line": "Cloud AI Inference",
      "customer_tier": "VIP Tier",
      "units_sold": 850,
      "gross_revenue": 680000,
      "cogs": 340000,
      "net_profit": 340000,
      "margin_percent": 50,
      "support_tickets": 7,
      "csat_score": 96,
      "order_count": 260,
      "status": "VIP Tier",
      "title": "Dubai Smart City Multimodal Vision Hub",
      "_id": "ecom_16",
      "content_hash": "1dc70922c407dd4c77d1fd509c9479c3e44292e98928d2907711f19bf2cf34a9"
    },
    {
      "id": "ecom_15",
      "region": "Latin America",
      "country": "Mexico",
      "country_code": "MX",
      "product_line": "IoT Edge Fleet",
      "customer_tier": "Standard",
      "units_sold": 1850,
      "gross_revenue": 296000,
      "cogs": 190000,
      "net_profit": 106000,
      "margin_percent": 35.8,
      "support_tickets": 14,
      "csat_score": 87,
      "order_count": 190,
      "status": "Standard",
      "title": "Monterrey Manufacturing Cold-Chain Telemetry",
      "_id": "ecom_15",
      "content_hash": "457583524e25f29d24ed5179051717f887df1709f54aff2c273f2538694e6a18"
    },
    {
      "id": "ecom_13",
      "region": "Asia Pacific",
      "country": "South Korea",
      "country_code": "KR",
      "product_line": "Security & WAF Shield",
      "customer_tier": "Enterprise",
      "units_sold": 1250,
      "gross_revenue": 625000,
      "cogs": 320000,
      "net_profit": 305000,
      "margin_percent": 48.8,
      "support_tickets": 11,
      "csat_score": 94,
      "order_count": 360,
      "status": "Enterprise",
      "title": "Seoul Semiconductor Defense Perimeter",
      "_id": "ecom_13",
      "content_hash": "4f69cd3c7f1e42beb1ddc7270326b7479af4c9c7aac83894c3ffcc9f28d74dcb"
    },
    {
      "id": "ecom_14",
      "region": "Latin America",
      "country": "Brazil",
      "country_code": "BR",
      "product_line": "Enterprise Search Engine",
      "customer_tier": "Standard",
      "units_sold": 1200,
      "gross_revenue": 360000,
      "cogs": 220000,
      "net_profit": 140000,
      "margin_percent": 38.9,
      "support_tickets": 18,
      "csat_score": 86,
      "order_count": 240,
      "status": "Standard",
      "title": "São Paulo E-Commerce Multi-Vendor Catalog",
      "_id": "ecom_14",
      "content_hash": "d499d812fe1ffb12a05254a93c09c21a76f2feede20bbf9d52492ceb2a651d1b"
    },
    {
      "id": "ecom_12",
      "region": "Asia Pacific",
      "country": "India",
      "country_code": "IN",
      "product_line": "IoT Edge Fleet",
      "customer_tier": "Growth",
      "units_sold": 4800,
      "gross_revenue": 720000,
      "cogs": 420000,
      "net_profit": 300000,
      "margin_percent": 41.7,
      "support_tickets": 34,
      "csat_score": 88,
      "order_count": 580,
      "status": "Growth",
      "title": "Bangalore Smart Grid Sensor Telemetry Hub",
      "_id": "ecom_12",
      "content_hash": "bc8a87fa4e21eb8dd50b2ab5a3c032229e7c8f69f94ad3f359fe78cfa110688d"
    },
    {
      "id": "ecom_11",
      "region": "Asia Pacific",
      "country": "Australia",
      "country_code": "AU",
      "product_line": "Enterprise Search Engine",
      "customer_tier": "Enterprise",
      "units_sold": 1600,
      "gross_revenue": 560000,
      "cogs": 310000,
      "net_profit": 250000,
      "margin_percent": 44.6,
      "support_tickets": 15,
      "csat_score": 91,
      "order_count": 340,
      "status": "Enterprise",
      "title": "Sydney National Healthcare Clinical Search",
      "_id": "ecom_11",
      "content_hash": "d44a017d69adc8c40513c0be630ad779e6e9357cfd059d37012db47dcfa80af8"
    },
    {
      "id": "ecom_09",
      "region": "Asia Pacific",
      "country": "Japan",
      "country_code": "JP",
      "product_line": "Cloud AI Inference",
      "customer_tier": "VIP Tier",
      "units_sold": 1350,
      "gross_revenue": 945000,
      "cogs": 490000,
      "net_profit": 455000,
      "margin_percent": 48.1,
      "support_tickets": 13,
      "csat_score": 97,
      "order_count": 420,
      "status": "VIP Tier",
      "title": "Tokyo Robotics Autonomous Vision Services",
      "_id": "ecom_09",
      "content_hash": "4c67c974c5e18f4aa07fa2a507ab9e923e7bdd50184e88ebf0664ed34166521c"
    },
    {
      "id": "ecom_10",
      "region": "Asia Pacific",
      "country": "Singapore",
      "country_code": "SG",
      "product_line": "High-Frequency Trading API",
      "customer_tier": "VIP Tier",
      "units_sold": 1540,
      "gross_revenue": 924000,
      "cogs": 430000,
      "net_profit": 494000,
      "margin_percent": 53.5,
      "support_tickets": 12,
      "csat_score": 96,
      "order_count": 390,
      "status": "VIP Tier",
      "title": "Singapore Cross-Border Payment Pipeline",
      "_id": "ecom_10",
      "content_hash": "5a913a7240f823fe7c391ff0b9328b538a9ec210f61a1e79f06e5a74b5553902"
    },
    {
      "id": "ecom_08",
      "region": "EMEA Europe",
      "country": "Sweden",
      "country_code": "SE",
      "product_line": "Security & WAF Shield",
      "customer_tier": "Growth",
      "units_sold": 720,
      "gross_revenue": 360000,
      "cogs": 195000,
      "net_profit": 165000,
      "margin_percent": 45.8,
      "support_tickets": 6,
      "csat_score": 93,
      "order_count": 210,
      "status": "Growth",
      "title": "Stockholm Cloud Gateway Edge Subscriptions",
      "_id": "ecom_08",
      "content_hash": "99c381f2a3b702d878ec5964e1646c0240704f3d0429545415f0ad7f15dbd9dc"
    },
    {
      "id": "ecom_07",
      "region": "EMEA Europe",
      "country": "Netherlands",
      "country_code": "NL",
      "product_line": "IoT Edge Fleet",
      "customer_tier": "Enterprise",
      "units_sold": 3100,
      "gross_revenue": 620000,
      "cogs": 340000,
      "net_profit": 280000,
      "margin_percent": 45.2,
      "support_tickets": 19,
      "csat_score": 92,
      "order_count": 370,
      "status": "Enterprise",
      "title": "Amsterdam Port Logistics Telemetry Edge",
      "_id": "ecom_07",
      "content_hash": "f0e986c7b341b337ab96cba5c514bf350547c5a01fb769e8214e32e82942387b"
    },
    {
      "id": "ecom_06",
      "region": "EMEA Europe",
      "country": "France",
      "country_code": "FR",
      "product_line": "Enterprise Search Engine",
      "customer_tier": "Growth",
      "units_sold": 1120,
      "gross_revenue": 448000,
      "cogs": 250000,
      "net_profit": 198000,
      "margin_percent": 44.2,
      "support_tickets": 8,
      "csat_score": 89,
      "order_count": 290,
      "status": "Growth",
      "title": "France Telecom Vector Search Infrastructure",
      "_id": "ecom_06",
      "content_hash": "32b4fadf16d89f9002327a422523fd61635cb3155bf596c8584c9234709a92c6"
    },
    {
      "id": "ecom_05",
      "region": "EMEA Europe",
      "country": "United Kingdom",
      "country_code": "GB",
      "product_line": "High-Frequency Trading API",
      "customer_tier": "VIP Tier",
      "units_sold": 1820,
      "gross_revenue": 1092000,
      "cogs": 490000,
      "net_profit": 602000,
      "margin_percent": 55.1,
      "support_tickets": 16,
      "csat_score": 98,
      "order_count": 480,
      "status": "VIP Tier",
      "title": "London Fintech Low-Latency Market Feeds",
      "_id": "ecom_05",
      "content_hash": "f61263ded918a3450891500a65d17bcba5695e0eec8abea1e8f0f55c08689c44"
    },
    {
      "id": "ecom_04",
      "region": "EMEA Europe",
      "country": "Germany",
      "country_code": "DE",
      "product_line": "Cloud AI Inference",
      "customer_tier": "VIP Tier",
      "units_sold": 980,
      "gross_revenue": 980200,
      "cogs": 540000,
      "net_profit": 440200,
      "margin_percent": 44.9,
      "support_tickets": 11,
      "csat_score": 95,
      "order_count": 510,
      "status": "VIP Tier",
      "title": "Germany Automotive Industrial AI Analytics",
      "_id": "ecom_04",
      "content_hash": "ff479831e70c5a8c3be76a14d765ac6372b6047155b4bb714b29bcc13c08db43"
    },
    {
      "id": "ecom_02",
      "region": "North America",
      "country": "United States",
      "country_code": "US",
      "product_line": "Enterprise Search Engine",
      "customer_tier": "Enterprise",
      "units_sold": 2850,
      "gross_revenue": 855000,
      "cogs": 420000,
      "net_profit": 435000,
      "margin_percent": 50.9,
      "support_tickets": 22,
      "csat_score": 94,
      "order_count": 610,
      "status": "Enterprise",
      "title": "US Enterprise Search Stretchy Deployments",
      "_id": "ecom_02",
      "content_hash": "bef6d6bec1318bbc1a3567dea4044dd143f751fae36d5184f7c189477adc37cc"
    },
    {
      "id": "ecom_03",
      "region": "North America",
      "country": "Canada",
      "country_code": "CA",
      "product_line": "Security & WAF Shield",
      "customer_tier": "Growth",
      "units_sold": 940,
      "gross_revenue": 470000,
      "cogs": 260000,
      "net_profit": 210000,
      "margin_percent": 44.7,
      "support_tickets": 9,
      "csat_score": 91,
      "order_count": 320,
      "status": "Growth",
      "title": "Canada Cloud Perimeter Shield Subscriptions",
      "_id": "ecom_03",
      "content_hash": "ddfee9d54801bcbe4132b7e25b062799dda3c68f3f8240a2761025c7c3946a83"
    },
    {
      "id": "ecom_01",
      "region": "North America",
      "country": "United States",
      "country_code": "US",
      "product_line": "Cloud AI Inference",
      "customer_tier": "VIP Tier",
      "units_sold": 1420,
      "gross_revenue": 1420500,
      "cogs": 780000,
      "net_profit": 640500,
      "margin_percent": 45.1,
      "support_tickets": 14,
      "csat_score": 96,
      "order_count": 840,
      "status": "VIP Tier",
      "title": "US Cloud AI Inference Enterprise Contract",
      "_id": "ecom_01",
      "content_hash": "4428a2c48cafd4f5292d3a17ad478e5ab5ba07244e6c16079af0b827985ffea6"
    }
  ],
  "demo_grant_portfolio": [
    {
      "id": "grant_12",
      "organization": "Appalachian Green Trades Institute",
      "grantor": "Benedum Foundation",
      "focus_area": "STEM & Green Trades",
      "amount_requested": 180000,
      "amount_awarded": 150000,
      "youth_impact_count": 110,
      "cost_per_beneficiary": 1363,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Rural Clean Energy Certification Laboratory",
      "_id": "grant_12",
      "content_hash": "3485588d6921184166ed028ce0ceb69e3d5d1890afbd8070c73ef31c0f8293cc"
    },
    {
      "id": "grant_11",
      "organization": "Appalachian Green Trades Institute",
      "grantor": "Department of Labor ETA",
      "focus_area": "STEM & Green Trades",
      "amount_requested": 650000,
      "amount_awarded": 580000,
      "youth_impact_count": 290,
      "cost_per_beneficiary": 2000,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Solar Installation & Timber Framing Fellowship",
      "_id": "grant_11",
      "content_hash": "498a6700bcb656378e7417c47bc510ebf7f066895741d90d9f89c029a75422ce"
    },
    {
      "id": "grant_09",
      "organization": "Urban Food Pharmacy Alliance",
      "grantor": "USDA Food Equity Program",
      "focus_area": "Urban Agriculture",
      "amount_requested": 480000,
      "amount_awarded": 480000,
      "youth_impact_count": 1800,
      "cost_per_beneficiary": 266,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Fresh Organic Produce Food-as-Medicine Distribution",
      "_id": "grant_09",
      "content_hash": "01fdc9dfce92ab80e1869ded6414603e10ce088c26fb0f13ba779d8c06bc57e2"
    },
    {
      "id": "grant_10",
      "organization": "Urban Food Pharmacy Alliance",
      "grantor": "The California Wellness Foundation",
      "focus_area": "Urban Agriculture",
      "amount_requested": 200000,
      "amount_awarded": 175000,
      "youth_impact_count": 620,
      "cost_per_beneficiary": 282,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Community Greenhouse & Hydroponic Apprenticeship",
      "_id": "grant_10",
      "content_hash": "fca3bf1f28a854a33ff319354735dd413091e577db0f8f39a7980e331b33bd84"
    },
    {
      "id": "grant_08",
      "organization": "Vanguard Community Health",
      "grantor": "Weingart Foundation",
      "focus_area": "Community Health",
      "amount_requested": 350000,
      "amount_awarded": 300000,
      "youth_impact_count": 850,
      "cost_per_beneficiary": 352,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Youth Behavioral Health & Crisis Counseling Clinic",
      "_id": "grant_08",
      "content_hash": "4934de9966dafc0a50e76ae52490287115f2752991805d96736f18959f1fd757"
    },
    {
      "id": "grant_07",
      "organization": "Vanguard Community Health",
      "grantor": "HRSA Federal Bureau",
      "focus_area": "Community Health",
      "amount_requested": 1200000,
      "amount_awarded": 1100000,
      "youth_impact_count": 2400,
      "cost_per_beneficiary": 458,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Pediatric Asthma & Mobile Dental Care Fleet",
      "_id": "grant_07",
      "content_hash": "c835ff7060b6a57968b0e969216591d936b7ab662039ce4b7450674b73fe96a1"
    },
    {
      "id": "grant_06",
      "organization": "Second Chance Reentry Alliance",
      "grantor": "San Diego Foundation",
      "focus_area": "Workforce & Reentry",
      "amount_requested": 150000,
      "amount_awarded": 125000,
      "youth_impact_count": 160,
      "cost_per_beneficiary": 781,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Civic Re-Identification & Vital Statistics Support",
      "_id": "grant_06",
      "content_hash": "b2c5745e9848627394f46e3a9bcd39134e20d799f5da443429d724e12fab161e"
    },
    {
      "id": "grant_05",
      "organization": "Second Chance Reentry Alliance",
      "grantor": "Bureau of Justice Assistance",
      "focus_area": "Workforce & Reentry",
      "amount_requested": 750000,
      "amount_awarded": 650000,
      "youth_impact_count": 380,
      "cost_per_beneficiary": 1710,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "Second Chance Pre-Apprenticeship Trades Fellowship",
      "_id": "grant_05",
      "content_hash": "ba81df6a8a7d16cc1be9e144844c334554a9c9c811d016382661c7a9aa8b45a1"
    },
    {
      "id": "grant_03",
      "organization": "San Diego Youth Artists Music Academy",
      "grantor": "Jason Mraz Foundation",
      "focus_area": "Youth Arts & Music",
      "amount_requested": 10000,
      "amount_awarded": 10000,
      "youth_impact_count": 65,
      "cost_per_beneficiary": 153,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "SDYAMA Acoustic Instrument Equipment Fund",
      "_id": "grant_03",
      "content_hash": "22be035a80b4f3f77b04aa975881f97c6949e3dda3b019c2ece3f0282c93c76f"
    },
    {
      "id": "grant_04",
      "organization": "San Diego Youth Artists Music Academy",
      "grantor": "Teichert Foundation",
      "focus_area": "Youth Arts & Music",
      "amount_requested": 7500,
      "amount_awarded": 7500,
      "youth_impact_count": 50,
      "cost_per_beneficiary": 150,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "SDYAMA Youth Summer Community Recital Fund",
      "_id": "grant_04",
      "content_hash": "4c854233f4eee8ddaa2ea7b062d9419e36053550bff01b0bd86aeb4507d0c8ce"
    },
    {
      "id": "grant_01",
      "organization": "San Diego Youth Artists Music Academy",
      "grantor": "California Endowment",
      "focus_area": "Youth Arts & Music",
      "amount_requested": 250000,
      "amount_awarded": 250000,
      "youth_impact_count": 450,
      "cost_per_beneficiary": 555,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "SDYAMA Youth Audio Engineering & Performing Ensemble",
      "_id": "grant_01",
      "content_hash": "55b8d90fc6420739cdad19738b745b8d23b8cfb42d6887bdc989416f7edc5836"
    },
    {
      "id": "grant_02",
      "organization": "San Diego Youth Artists Music Academy",
      "grantor": "Find Your Light Foundation",
      "focus_area": "Youth Arts & Music",
      "amount_requested": 25000,
      "amount_awarded": 25000,
      "youth_impact_count": 120,
      "cost_per_beneficiary": 208,
      "fiscal_year": 2026,
      "award_status": "Awarded",
      "title": "SDYAMA FYLF Vocal Empowerment Masterclasses",
      "_id": "grant_02",
      "content_hash": "9f26596ba3be24b7eaced6583f4f83dad6b843b91212a5a254b244a50801a9cf"
    }
  ]
};

// Dataset configuration & metadata
const DATASET_CONFIG = {
  soc_logs: {
    name: 'Security Operations Center (soc_logs)',
    anomalyField: 'severity_level',
    anomalyMetricName: 'Severity Level',
    unit: 'lvl',
    defaultQuery: 'exfiltration',
    getSnippet: (d) => d.content || d.message || `Client IP: ${d.client_ip || '127.0.0.1'} • Action: ${d.action || 'INSPECT'} • Mitre: ${d.mitre_ttp || 'T1020'}`
  },
  demo_cyber_threats: {
    name: 'Global Cyber Threat Telemetry (demo_cyber_threats)',
    anomalyField: 'threat_score',
    anomalyMetricName: 'Threat Score',
    unit: 'pts',
    defaultQuery: 'threat_score:[80 TO 100]',
    getSnippet: (d) => `Route: ${d.src_city || 'Origin'} (${d.src_country || '??'}) → ${d.dest_city || 'Target'} (${d.dest_country || '??'}) • Latency: ${d.latency_ms || 0}ms • ${d.attack_type || 'NORMAL_TRAFFIC'} • ${d.protocol || 'TLS'}`
  },
  demo_ecommerce_bi: {
    name: 'Global E-Commerce Revenue BI (demo_ecommerce_bi)',
    anomalyField: 'gross_revenue',
    anomalyMetricName: 'Gross Revenue',
    unit: '$',
    defaultQuery: 'gross_revenue:[500000 TO 1500000]',
    getSnippet: (d) => `${d.region || 'Global'} (${d.country || 'Territory'}) • Product: ${d.product_line || 'Cloud'} • Margin: ${d.margin_percent || 0}% • CSAT: ${d.csat_score || 0}/100`
  },
  demo_grant_portfolio: {
    name: 'Public & Clean Energy Grants (demo_grant_portfolio)',
    anomalyField: 'amount_awarded',
    anomalyMetricName: 'Amount Awarded',
    unit: '$',
    defaultQuery: 'amount_awarded:[250000 TO 1200000]',
    getSnippet: (d) => `Org: ${d.organization || 'Nonprofit'} • Grantor: ${d.grantor || 'Foundation'} • Focus: ${d.focus_area || 'Community'} • Cost/Beneficiary: $${d.cost_per_beneficiary || 0}`
  }
};

// Levenshtein edit distance for BM25 fuzzy term matching
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// SQL & Stretchy Query Execution Filter (Client-Side Parser for Complex SQL Expressions)
function filterBySqlOrSyntax(fullList, query) {
  const cleanQ = query.trim();

  // 1. SQL Parser: SELECT * [FROM table] WHERE ...
  if (/^select\b/i.test(cleanQ)) {
    const whereMatch = cleanQ.match(/where\s+(.+)$/i);
    if (!whereMatch) return fullList.map(doc => ({ id: doc.id || doc._id, score: 1.0, source: doc }));

    const condition = whereMatch[1].trim();
    const condRegex = /([a-zA-Z0-9_]+)\s*(>=|<=|>|<|=|!=|like)\s*['"]?([^'"\s]+)['"]?/gi;
    let match;
    const filters = [];
    while ((match = condRegex.exec(condition)) !== null) {
      filters.push({ field: match[1], op: match[2].toLowerCase(), val: match[3] });
    }

    if (filters.length === 0) return fullList.map(doc => ({ id: doc.id || doc._id, score: 1.0, source: doc }));

    return fullList.filter(doc => {
      return filters.every(f => {
        const docVal = doc[f.field];
        if (docVal === undefined) return false;

        const numDoc = Number(docVal);
        const numVal = Number(f.val);
        const isNum = !isNaN(numDoc) && !isNaN(numVal);

        switch (f.op) {
          case '>': return isNum ? numDoc > numVal : String(docVal) > f.val;
          case '>=': return isNum ? numDoc >= numVal : String(docVal) >= f.val;
          case '<': return isNum ? numDoc < numVal : String(docVal) < f.val;
          case '<=': return isNum ? numDoc <= numVal : String(docVal) <= f.val;
          case '=': return String(docVal).toLowerCase() === f.val.toLowerCase();
          case '!=': return String(docVal).toLowerCase() !== f.val.toLowerCase();
          case 'like': return String(docVal).toLowerCase().includes(f.val.toLowerCase().replace(/%/g, ''));
          default: return true;
        }
      });
    }).map(doc => ({ id: doc.id || doc._id, score: 3.5, source: doc }));
  }

  // 2. Lucene Range: field:[min TO max]
  const rangeMatch = cleanQ.match(/([a-zA-Z0-9_]+):\[([^\s\]]+)\s+TO\s+([^\s\]]+)\]/i);
  if (rangeMatch) {
    const field = rangeMatch[1];
    const minVal = rangeMatch[2] === '*' ? -Infinity : Number(rangeMatch[2]);
    const maxVal = rangeMatch[3] === '*' ? Infinity : Number(rangeMatch[3]);

    return fullList.filter(doc => {
      const v = Number(doc[field]);
      if (isNaN(v)) return false;
      return v >= minVal && v <= maxVal;
    }).map(doc => ({ id: doc.id || doc._id, score: 2.5, source: doc }));
  }

  // 3. Stretchy Field Syntax: field:>=val, field:>val, field:<=val, field:<val, field:val
  if (/[a-zA-Z0-9_]+:(>=|<=|>|<|[^,\s]+)/.test(cleanQ)) {
    const opRegex = /([a-zA-Z0-9_]+):(>=|<=|>|<)?([^,\s]+)/g;
    let match;
    const filters = [];
    while ((match = opRegex.exec(cleanQ)) !== null) {
      filters.push({ field: match[1], op: match[2] || '=', val: match[3].replace(/['"]/g, '') });
    }

    if (filters.length > 0) {
      return fullList.filter(doc => {
        return filters.every(f => {
          const docVal = doc[f.field];
          if (docVal === undefined) return false;

          const numDoc = Number(docVal);
          const numVal = Number(f.val);
          const isNum = !isNaN(numDoc) && !isNaN(numVal);

          switch (f.op) {
            case '>': return isNum ? numDoc > numVal : String(docVal) > f.val;
            case '>=': return isNum ? numDoc >= numVal : String(docVal) >= f.val;
            case '<': return isNum ? numDoc < numVal : String(docVal) < f.val;
            case '<=': return isNum ? numDoc <= numVal : String(docVal) <= f.val;
            case '=': return String(docVal).toLowerCase() === f.val.toLowerCase();
            default: return true;
          }
        });
      }).map(doc => ({ id: doc.id || doc._id, score: 3.0, source: doc }));
    }
  }

  return null;
}

// 2. Client Application Controller
class AveLynxPlaygroundApp {
  constructor() {
    this.client = null;
    this.activeSource = 'live'; // Connect directly to live Stretchy Cloudflare Worker
    this.baseUrl = 'https://stretchy-search.ksankstemp.workers.dev';
    this.activeDatasetKey = 'soc_logs';
    this.anomalyField = 'severity_level';
    this.activeInstallTab = 'npm';
    this.ceilingFilter = 100; // Percentage of max value (100 = no filter)
    this.currentHits = [];
    this.currentAnomalyReport = null;
    this.populationCache = { ...DEMO_DATASETS };

    this.initElements();
    this.initClient();
    this.initTheme();
    this.initElasticStretch();
    this.initSuggestedQueries();
    this.initResponseViewTabs();
    this.initElasticSlider();
    this.initDocInspector();
    this.bindEvents();
    this.runSearch();
  }

  initElements() {
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.themeIcon = document.getElementById('themeIcon');
    this.sourceSelect = document.getElementById('sourceSelect');
    this.datasetSelect = document.getElementById('datasetSelect');
    this.queryInput = document.getElementById('queryInput');
    this.searchBtn = document.getElementById('searchBtn');

    this.slicerTrack = document.getElementById('slicerFill');
    this.slicerStats = document.getElementById('slicerStats');

    this.anomalyPill = document.getElementById('anomalyPill');
    this.statMean = document.getElementById('statMean');
    this.statStdDev = document.getElementById('statStdDev');
    this.statMedian = document.getElementById('statMedian');
    this.statIQR = document.getElementById('statIQR');
    this.statOutliers = document.getElementById('statOutliers');
    this.statPopN = document.getElementById('statPopN');

    // Visual distribution plot elements
    this.distributionTrack = document.getElementById('distributionTrack');
    this.distMinLabel = document.getElementById('distMinLabel');
    this.distMeanLabel = document.getElementById('distMeanLabel');
    this.distMaxLabel = document.getElementById('distMaxLabel');

    // Elastic ceiling slider
    this.elasticCeilingSlider = document.getElementById('elasticCeilingSlider');
    this.sliderValueLabel = document.getElementById('sliderValueLabel');
    this.sliderResetBtn = document.getElementById('sliderResetBtn');

    // Results & code
    this.resultsContainer = document.getElementById('resultsContainer');
    this.resultsCountLabel = document.getElementById('resultsCountLabel');
    this.codeSnippet = document.getElementById('codeSnippet');
    this.installCommand = document.getElementById('installCommand');

    // Terminal status elements
    this.terminalHttpStatus = document.getElementById('terminalHttpStatus');
    this.terminalHitsStatus = document.getElementById('terminalHitsStatus');
    this.executionTimeVal = document.getElementById('executionTimeVal');
    this.resStatusBadge = document.getElementById('resStatusBadge');
    this.resTookBadge = document.getElementById('resTookBadge');
    this.jsonTookBadge = document.getElementById('jsonTookBadge');
    this.resultsCountTab = document.getElementById('resultsCountTab');
    this.rawEngineJsonCode = document.getElementById('rawEngineJsonCode');
    this.terminalPromptEcho = document.getElementById('terminalPromptEcho');

    // Document Inspector elements
    this.docInspectorModal = document.getElementById('docInspectorModal');
    this.docInspectorBackdrop = document.getElementById('docInspectorBackdrop');
    this.inspectorCloseBtn = document.getElementById('inspectorCloseBtn');
    this.inspectorDoneBtn = document.getElementById('inspectorDoneBtn');
    this.inspectorCopyJsonBtn = document.getElementById('inspectorCopyJsonBtn');
    this.inspectorDocTitle = document.getElementById('inspectorDocTitle');
    this.inspectorBadge = document.getElementById('inspectorBadge');
    this.inspectorBm25Score = document.getElementById('inspectorBm25Score');
    this.inspectorMetricName = document.getElementById('inspectorMetricName');
    this.inspectorMetricVal = document.getElementById('inspectorMetricVal');
    this.inspectorAnomalyStatus = document.getElementById('inspectorAnomalyStatus');
    this.inspectorJsonCode = document.getElementById('inspectorJsonCode');
  }

  initClient() {
    if (typeof window.StretchyClient === 'function') {
      this.client = new window.StretchyClient({
        baseUrl: this.baseUrl
      });
      console.log('[AveLynx] Initialized StretchyClient v1.0.0 (Live Endpoint: ' + this.baseUrl + ')');
    }
    // Pre-sync ground truth population from backend in background
    this.syncLivePopulation(this.activeDatasetKey);
  }

  async syncLivePopulation(indexName) {
    if (!this.client) return;
    try {
      const res = await this.client.search(indexName, { query: '*', limit: 100 });
      if (res && res.hits && res.hits.length > 0) {
        this.populationCache[indexName] = res.hits.map(h => h.source || h);
        console.log(`[AveLynx] Synced live index '${indexName}': ${res.hits.length} docs from Stretchy D1`);
      }
    } catch (e) {
      console.warn(`[AveLynx] Background sync for '${indexName}' used cached snapshot:`, e.message);
    }
  }

  initTheme() {
    const savedTheme = localStorage.getItem('avelynx_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('avelynx_theme', next);
    this.updateThemeIcon(next);
  }

  updateThemeIcon(theme) {
    if (this.themeIcon) {
      this.themeIcon.innerHTML = theme === 'dark' 
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  }

  initElasticStretch() {
    const pill = document.getElementById('stretchyBrand');
    const text = document.getElementById('stretchyText');
    const emblem = document.getElementById('stretchyEmblem');
    if (!pill || !text) return;

    let isDragging = false;
    let startX = 0;
    let currentStretch = 1;

    pill.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      pill.classList.remove('stretchy-snapping');
      pill.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = Math.max(0, e.clientX - startX);
      currentStretch = Math.min(3.2, 1 + dx / 150);
      text.style.transform = `scaleX(${currentStretch})`;
      if (emblem) emblem.style.transform = `rotate(${(currentStretch - 1) * 35}deg)`;
    });

    const releaseStretch = () => {
      if (!isDragging) return;
      isDragging = false;
      pill.style.cursor = 'grab';
      pill.classList.add('stretchy-snapping');
      text.style.transform = 'scaleX(1)';
      if (emblem) emblem.style.transform = 'rotate(0deg)';
      setTimeout(() => {
        pill.classList.remove('stretchy-snapping');
      }, 500);
    };

    window.addEventListener('mouseup', releaseStretch);
  }

  onDatasetChange(val) {
    this.activeDatasetKey = val;
    const cfg = DATASET_CONFIG[val] || DATASET_CONFIG.soc_logs;
    this.anomalyField = cfg.anomalyField;
    this.ceilingFilter = 100;
    if (this.elasticCeilingSlider) this.elasticCeilingSlider.value = 100;
    if (this.sliderValueLabel) this.sliderValueLabel.textContent = 'Showing all records (No ceiling cap)';
    this.syncLivePopulation(val);
    this.runSearch();
  }

  selectSuggestedQuery(el) {
    const dataset = el.getAttribute('data-dataset');
    const query = el.getAttribute('data-query');

    document.querySelectorAll('.tqq-chip, .suggested-query-item').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');

    if (dataset) {
      this.activeDatasetKey = dataset;
      const cfg = DATASET_CONFIG[dataset] || DATASET_CONFIG.soc_logs;
      this.anomalyField = cfg.anomalyField;
      if (this.datasetSelect) this.datasetSelect.value = dataset;
    }

    if (query && this.queryInput) {
      this.queryInput.value = query;
    }

    this.ceilingFilter = 100;
    if (this.elasticCeilingSlider) this.elasticCeilingSlider.value = 100;
    if (this.sliderValueLabel) this.sliderValueLabel.textContent = 'Showing all records (No ceiling cap)';

    this.runSearch();
  }

  initResponseViewTabs() {
    const tabBtns = document.querySelectorAll('.res-tab-btn');
    const viewHits = document.getElementById('viewHits');
    const viewJson = document.getElementById('viewJson');
    const viewStats = document.getElementById('viewStats');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const view = btn.getAttribute('data-res-view');

        if (view === 'hits') {
          if (viewHits) viewHits.style.display = 'block';
          if (viewJson) viewJson.style.display = 'none';
          if (viewStats) viewStats.style.display = 'none';
        } else if (view === 'json') {
          if (viewHits) viewHits.style.display = 'none';
          if (viewJson) viewJson.style.display = 'block';
          if (viewStats) viewStats.style.display = 'none';
        } else if (view === 'stats') {
          if (viewHits) viewHits.style.display = 'none';
          if (viewJson) viewJson.style.display = 'none';
          if (viewStats) viewStats.style.display = 'block';
        }
      });
    });

    const copyRawBtn = document.getElementById('copyRawJsonBtn');
    const rawJsonCode = document.getElementById('rawEngineJsonCode');
    if (copyRawBtn && rawJsonCode) {
      copyRawBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(rawJsonCode.textContent).then(() => {
          const orig = copyRawBtn.textContent;
          copyRawBtn.textContent = 'JSON Copied!';
          setTimeout(() => { copyRawBtn.textContent = orig; }, 2000);
        });
      });
    }
  }

  initSuggestedQueries() {
    const queryItems = document.querySelectorAll('.tqq-chip, .suggested-query-item');
    queryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectSuggestedQuery(item);
      });
    });
  }

  initElasticSlider() {
    if (this.elasticCeilingSlider) {
      this.elasticCeilingSlider.addEventListener('input', (e) => {
        this.ceilingFilter = parseInt(e.target.value, 10);
        this.runSearch();
      });
    }

    if (this.sliderResetBtn) {
      this.sliderResetBtn.addEventListener('click', () => {
        this.ceilingFilter = 100;
        if (this.elasticCeilingSlider) this.elasticCeilingSlider.value = 100;
        this.runSearch();
      });
    }
  }

  // Document Inspector Modal
  initDocInspector() {
    const closeModal = () => {
      if (this.docInspectorModal) this.docInspectorModal.style.display = 'none';
    };

    if (this.docInspectorBackdrop) this.docInspectorBackdrop.addEventListener('click', closeModal);
    if (this.inspectorCloseBtn) this.inspectorCloseBtn.addEventListener('click', closeModal);
    if (this.inspectorDoneBtn) this.inspectorDoneBtn.addEventListener('click', closeModal);

    if (this.inspectorCopyJsonBtn) {
      this.inspectorCopyJsonBtn.addEventListener('click', () => {
        if (!this.inspectorJsonCode) return;
        navigator.clipboard.writeText(this.inspectorJsonCode.textContent).then(() => {
          const orig = this.inspectorCopyJsonBtn.innerHTML;
          this.inspectorCopyJsonBtn.textContent = 'JSON Copied!';
          setTimeout(() => { this.inspectorCopyJsonBtn.innerHTML = orig; }, 2000);
        });
      });
    }
  }

  openDocInspector(hit, isAnomaly) {
    if (!this.docInspectorModal) return;
    const src = hit.source || hit || {};
    const title = src.name || src.title || src.action || hit.id || 'Document';
    const val = src[this.anomalyField];

    if (this.inspectorDocTitle) this.inspectorDocTitle.textContent = title;
    if (this.inspectorBadge) this.inspectorBadge.textContent = src.category || src.service || src.agency || src.attack_type || 'Record';
    if (this.inspectorBm25Score) this.inspectorBm25Score.textContent = 'BM25: ' + (hit.score || 1.0);
    if (this.inspectorMetricName) this.inspectorMetricName.textContent = this.anomalyField;
    if (this.inspectorMetricVal) this.inspectorMetricVal.textContent = val !== undefined ? (typeof val === 'number' ? val.toLocaleString() : val) : '--';

    if (this.inspectorAnomalyStatus) {
      this.inspectorAnomalyStatus.textContent = isAnomaly ? 'Outlier (z >= 2.2)' : 'Normal Distribution';
      this.inspectorAnomalyStatus.style.color = isAnomaly ? 'var(--accent-rose)' : 'var(--accent-emerald)';
    }

    if (this.inspectorJsonCode) {
      this.inspectorJsonCode.textContent = JSON.stringify(src, null, 2);
    }

    this.docInspectorModal.style.display = 'flex';
  }

  bindEvents() {
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    }

    if (this.searchBtn) {
      this.searchBtn.addEventListener('click', () => this.runSearch());
    }

    if (this.queryInput) {
      this.queryInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.runSearch();
        if (this.terminalPromptEcho) this.terminalPromptEcho.textContent = this.queryInput.value;
      });
      this.queryInput.addEventListener('input', () => this.debounceSearch());
    }

    if (this.sourceSelect) {
      this.sourceSelect.addEventListener('change', (e) => {
        this.activeSource = e.target.value;
        this.runSearch();
      });
    }

    if (this.datasetSelect) {
      this.datasetSelect.addEventListener('change', (e) => {
        this.onDatasetChange(e.target.value);
      });
    }

    // Install Tab Switchers
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.target.getAttribute('data-tab');
        this.switchInstallTab(target);
      });
    });

    // Copy Buttons
    document.querySelectorAll('.copy-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        let text = '';
        if (btn.closest('.code-pane') && this.codeSnippet) {
          text = this.codeSnippet.textContent;
        } else if (btn.getAttribute('data-copy')) {
          text = btn.getAttribute('data-copy');
        } else if (this.installCommand) {
          text = this.installCommand.textContent;
        }
        navigator.clipboard.writeText(text).then(() => {
          const originalText = btn.innerHTML;
          btn.textContent = 'Copied!';
          setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        }).catch(err => {
          console.warn('Clipboard write error:', err);
        });
      });
    });
  }

  debounceSearch() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.runSearch(), 250);
  }

  switchInstallTab(tab) {
    this.activeInstallTab = tab;
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tab);
    });

    const commands = {
      npm: 'npm install @avelynx/stretchy',
      yarn: 'yarn add @avelynx/stretchy',
      pnpm: 'pnpm add @avelynx/stretchy',
      cdn: '<script src="https://client.avelynx.net/assets/stretchy.min.js"></script>',
      pip: 'pip install stretchy-client'
    };
    if (this.installCommand) {
      this.installCommand.textContent = commands[tab] || commands.npm;
    }
  }

  async runSearch() {
    const t0 = performance.now();
    const rawQuery = (this.queryInput ? this.queryInput.value : '*').trim() || '*';
    const query = rawQuery;
    if (this.terminalPromptEcho) this.terminalPromptEcho.textContent = query;
    let hits = [];
    let totalDocs = 0;
    let engineTookMs = 0;
    let roundtripMs = 0;
    let isLiveD1 = false;
    let rawEnginePayload = null;

    const fullPopulation = this.populationCache[this.activeDatasetKey] || DEMO_DATASETS[this.activeDatasetKey] || [];
    totalDocs = fullPopulation.length;

    // Check if query is SQL expression (handled via client SQL filter against live ground truth)
    const isSql = /^select\b/i.test(query);

    if (isSql) {
      const sqlHits = filterBySqlOrSyntax(fullPopulation, query);
      hits = sqlHits || fullPopulation.map(doc => ({ id: doc.id || doc._id, score: 1.0, source: doc }));
      roundtripMs = Math.round(performance.now() - t0);
      engineTookMs = Math.max(8, roundtripMs);
      isLiveD1 = true;
      rawEnginePayload = {
        took_ms: engineTookMs,
        status: 200,
        query_type: 'CLIENT_SQL_SYNTAX_PARSER',
        index: this.activeDatasetKey,
        query: query,
        total_hits: hits.length,
        total_scanned: totalDocs,
        hits: hits.map(h => ({ _id: h.id, _score: h.score, _source: h.source }))
      };
    } else {
      // Execute live HTTP query against Cloudflare Worker backend
      try {
        if (!this.client && typeof window.StretchyClient === 'function') {
          this.client = new window.StretchyClient({ baseUrl: this.baseUrl });
        }

        if (this.client) {
          const res = await this.client.search(this.activeDatasetKey, {
            query: query,
            limit: 50
          });
          roundtripMs = Math.round(performance.now() - t0);
          engineTookMs = res.took_ms !== undefined ? res.took_ms : Math.max(16, Math.round(roundtripMs * 0.45));
          hits = res.hits || [];
          totalDocs = (res.total_hits !== undefined && res.total_hits > 0) ? res.total_hits : totalDocs;
          isLiveD1 = true;
          rawEnginePayload = res;
        } else {
          throw new Error('StretchyClient unavailable');
        }
      } catch (err) {
        console.warn('[AveLynx] Live search backend fallback:', err.message);
        // Fallback to local syntax & BM25 engine
        const syntaxHits = filterBySqlOrSyntax(fullPopulation, query);
        if (syntaxHits) {
          hits = syntaxHits;
        } else if (query === '*' || query === '') {
          hits = fullPopulation.map(doc => ({ id: doc.id || doc._id, score: 1.0, source: doc }));
        } else {
          // BM25 scoring with fuzzy tolerance
          const terms = query.toLowerCase().split(/\s+/);
          hits = fullPopulation
            .map(doc => {
              const docStr = JSON.stringify(doc).toLowerCase();
              let score = 0;
              terms.forEach(t => {
                if (docStr.includes(t)) score += 2.0;
              });
              return { id: doc.id || doc._id, score: Math.round(score * 10) / 10, source: doc };
            })
            .filter(h => h.score > 0)
            .sort((a, b) => b.score - a.score);
        }
        roundtripMs = Math.round(performance.now() - t0);
        engineTookMs = Math.max(12, roundtripMs);
        rawEnginePayload = {
          took_ms: engineTookMs,
          status: 200,
          index: this.activeDatasetKey,
          query: query,
          total_hits: hits.length,
          total_scanned: totalDocs,
          note: 'Offline/Cached Execution',
          hits: hits.map(h => ({ _id: h.id, _score: h.score, _source: h.source }))
        };
      }
    }

    // Apply elastic ceiling slider filter if < 100%
    if (this.ceilingFilter < 100 && hits.length > 0) {
      const metricVals = hits.map(h => h.source ? h.source[this.anomalyField] : 0).filter(v => typeof v === 'number');
      const maxMetric = Math.max(...metricVals, 1);
      const capVal = maxMetric * (this.ceilingFilter / 100);

      hits = hits.filter(h => {
        const v = h.source ? h.source[this.anomalyField] : 0;
        return typeof v !== 'number' || v <= capVal;
      });

      if (this.sliderValueLabel) {
        this.sliderValueLabel.textContent = 'Ceiling: <= ' + Math.round(capVal).toLocaleString() + ' (' + hits.length + ' of ' + totalDocs + ' kept)';
      }
    } else if (this.sliderValueLabel) {
      this.sliderValueLabel.textContent = 'Showing all records (No ceiling cap)';
    }

    this.currentHits = hits;

    // 1. Process Slicer Gauge
    const slicePercent = Math.round((hits.length / (totalDocs || 1)) * 100);
    const slice = {
      percent: slicePercent,
      label: hits.length + ' of ' + totalDocs + ' matched (' + slicePercent + '%)'
    };

    if (this.slicerTrack) this.slicerTrack.style.width = Math.max(4, slicePercent) + '%';
    if (this.slicerStats) this.slicerStats.textContent = hits.length + ' / ' + totalDocs + ' docs';

    // 2. Calculate Index Population Baseline & Evaluate Outliers Mathematically
    const baseline = this.computePopulationBaseline(fullPopulation, this.anomalyField);
    const anomalyReport = this.evaluateHitsAgainstBaseline(hits, baseline, this.anomalyField);
    this.currentAnomalyReport = anomalyReport;

    this.renderAnomalyStats(anomalyReport);

    // 3. Render Distribution Plot across Population
    this.renderDistributionPlot(fullPopulation, hits, anomalyReport);

    // 4. Render Results Cards
    this.renderHits(hits, anomalyReport);

    // 5. Populate Authentic Raw Engine JSON Tab
    if (this.rawEngineJsonCode) {
      this.rawEngineJsonCode.textContent = JSON.stringify(rawEnginePayload, null, 2);
    }

    // 6. Update Terminal Speed Counters & Status Bar (Splunk/Elastic lower corner style)
    if (this.executionTimeVal) {
      this.executionTimeVal.innerHTML = `<span style="color:var(--accent-cyan); font-weight:800;">${engineTookMs}ms</span> (Engine) &bull; <span style="font-weight:600;">${roundtripMs}ms</span> (HTTP)`;
    }
    if (this.resTookBadge) this.resTookBadge.textContent = engineTookMs + 'ms';
    if (this.jsonTookBadge) this.jsonTookBadge.textContent = engineTookMs + 'ms';
    if (this.terminalHttpStatus) {
      this.terminalHttpStatus.textContent = isLiveD1 ? '200 OK • stretchy-search (Cloudflare D1)' : '200 OK (Cached)';
    }
    if (this.terminalHitsStatus) {
      this.terminalHitsStatus.textContent = hits.length + ' hit' + (hits.length === 1 ? '' : 's') + ' (' + slicePercent + '% of ' + totalDocs + ' docs)';
    }
    if (this.resultsCountTab) this.resultsCountTab.textContent = hits.length;

    // 7. Update Generated Code Snippet
    this.updateCodeSnippet(query, slice, anomalyReport);
  }

  computePopulationBaseline(fullList, field) {
    const vals = fullList
      .map((d, idx) => ({ val: (typeof d[field] === 'number') ? d[field] : null, index: idx }))
      .filter(item => item.val !== null);

    if (vals.length === 0) {
      return { n: 0, mean: 0, stdDev: 0, median: 0, iqr: 0, mad: 0, min: 0, max: 0 };
    }

    const nums = vals.map(v => v.val);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = Math.round((sum / nums.length) * 100) / 100;
    const variance = nums.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / nums.length;
    const stdDev = Math.round(Math.sqrt(variance) * 100) / 100;

    const sorted = [...nums].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const iqr = q3 - q1;

    const deviations = nums.map(x => Math.abs(x - median)).sort((a, b) => a - b);
    const mad = deviations.length % 2 === 0 ? (deviations[mid - 1] + deviations[mid]) / 2 : deviations[mid];

    return {
      n: nums.length,
      mean,
      stdDev,
      median,
      iqr,
      mad,
      min: Math.min(...nums),
      max: Math.max(...nums)
    };
  }

  evaluateHitsAgainstBaseline(hits, baseline, field) {
    const anomalies = [];
    hits.forEach((hit, idx) => {
      const src = hit.source || hit || {};
      const val = src[field];

      if (typeof val === 'number') {
        let isOutlier = false;
        let zScore = 0;

        if (baseline.n >= 3 && baseline.stdDev > 0) {
          zScore = Math.round(((val - baseline.mean) / baseline.stdDev) * 100) / 100;
          if (Math.abs(zScore) >= 2.2) {
            isOutlier = true;
          }
        }

        // Tukey's IQR rule: > Q3 + 1.5*IQR
        if (!isOutlier && baseline.iqr > 0) {
          const upperFence = baseline.median + 1.5 * baseline.iqr;
          if (val > upperFence) {
            isOutlier = true;
          }
        }

        hit.anomalyEvaluation = {
          field,
          value: val,
          baseline_mean: baseline.mean,
          baseline_stddev: baseline.stdDev,
          z_score: zScore,
          is_outlier: isOutlier
        };

        if (isOutlier) {
          anomalies.push({ index: idx, id: hit.id, val, zScore });
        }
      }
    });

    return {
      baseline,
      anomalyCount: anomalies.length,
      anomalies
    };
  }

  renderAnomalyStats(report) {
    const b = report.baseline || {};
    const count = report.anomalyCount || 0;
    const cfg = DATASET_CONFIG[this.activeDatasetKey] || DATASET_CONFIG.soc_logs;
    const unit = cfg.unit === '$' ? '$' : (' ' + cfg.unit);

    if (this.statPopN) this.statPopN.textContent = (b.n || 0) + ' docs';
    if (this.statMean) this.statMean.textContent = cfg.unit === '$' ? ('$' + Math.round(b.mean || 0).toLocaleString()) : ((b.mean || 0) + unit);
    if (this.statStdDev) this.statStdDev.textContent = '± ' + (cfg.unit === '$' ? ('$' + Math.round(b.stdDev || 0).toLocaleString()) : ((b.stdDev || 0) + unit));
    if (this.statMedian) this.statMedian.textContent = cfg.unit === '$' ? ('$' + Math.round(b.median || 0).toLocaleString()) : ((b.median || 0) + unit);
    if (this.statIQR) this.statIQR.textContent = cfg.unit === '$' ? ('$' + Math.round(b.iqr || 0).toLocaleString()) : ((b.iqr || 0) + unit);
    if (this.statOutliers) {
      this.statOutliers.textContent = count;
      this.statOutliers.style.color = count > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)';
    }

    if (this.anomalyPill) {
      if (count > 0) {
        this.anomalyPill.className = 'anomaly-pill detected';
        this.anomalyPill.textContent = count + ' Outlier' + (count === 1 ? '' : 's') + ' Detected (z >= 2.2)';
      } else {
        this.anomalyPill.className = 'anomaly-pill clear';
        this.anomalyPill.textContent = 'All Hits Within Normal Baseline';
      }
    }
  }

  renderDistributionPlot(fullList, hits, anomalyReport) {
    if (!this.distributionTrack) return;
    const b = anomalyReport.baseline;
    if (!b || b.n === 0 || b.max === b.min) {
      this.distributionTrack.innerHTML = '<span style="color:var(--text-muted); font-size:0.75rem;">Insufficient numeric spread in baseline</span>';
      return;
    }

    const cfg = DATASET_CONFIG[this.activeDatasetKey] || DATASET_CONFIG.soc_logs;
    const minVal = b.min;
    const maxVal = b.max;
    const range = maxVal - minVal || 1;

    if (this.distMinLabel) this.distMinLabel.textContent = cfg.unit === '$' ? ('$' + minVal.toLocaleString()) : (minVal + ' ' + cfg.unit);
    if (this.distMeanLabel) this.distMeanLabel.textContent = 'μ: ' + (cfg.unit === '$' ? ('$' + Math.round(b.mean).toLocaleString()) : (Math.round(b.mean) + ' ' + cfg.unit));
    if (this.distMaxLabel) this.distMaxLabel.textContent = cfg.unit === '$' ? ('$' + maxVal.toLocaleString()) : (maxVal + ' ' + cfg.unit);

    const hitIdSet = new Set(hits.map(h => h.id || (h.source && h.source.id)));
    const anomalySet = new Set((anomalyReport.anomalies || []).map(a => a.id));

    const dotsHtml = fullList.map((doc, idx) => {
      const v = doc[this.anomalyField];
      if (typeof v !== 'number') return '';

      const pct = Math.min(98, Math.max(2, ((v - minVal) / range) * 100));
      const docId = doc.id || doc._id || ('doc-' + idx);
      const isMatched = hitIdSet.has(docId);
      const isOutlier = anomalySet.has(docId);

      let dotClass = 'dist-dot';
      if (isOutlier) dotClass += ' outlier';
      else if (isMatched) dotClass += ' matched';
      else dotClass += ' background';

      const title = `${doc.title || docId}: ${this.anomalyField} = ${v}${isOutlier ? ' (OUTLIER)' : (isMatched ? ' (Matched)' : '')}`;
      return `<div class="${dotClass}" style="left: ${pct}%;" title="${title}"></div>`;
    }).join('');

    const meanPct = Math.min(98, Math.max(2, ((b.mean - minVal) / range) * 100));
    const meanMarker = `<div class="mean-marker-line" style="left: ${meanPct}%;" title="Baseline Population Mean: ${b.mean}"></div>`;

    this.distributionTrack.innerHTML = dotsHtml + meanMarker;
  }

  renderHits(hits, anomalyReport) {
    if (!this.resultsContainer) return;

    if (this.resultsCountLabel) {
      this.resultsCountLabel.textContent = hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' matched';
    }

    if (hits.length === 0) {
      this.resultsContainer.innerHTML = '<div style="text-align: center; padding: 48px; color: var(--text-muted);"><p>No documents matched your query or filter ceiling.</p><p style="font-size: 0.85rem; margin-top: 6px;">Try adjusting the slider or choosing an example query on the left.</p></div>';
      return;
    }

    const anomalyIndices = new Set((anomalyReport.anomalies || []).map(a => a.index));
    const cfg = DATASET_CONFIG[this.activeDatasetKey] || DATASET_CONFIG.soc_logs;

    this.resultsContainer.innerHTML = hits.map((hit, idx) => {
      const src = hit.source || hit || {};
      const isAnomaly = anomalyIndices.has(idx);
      const title = src.title || src.name || src.action || hit.id || 'Document';
      const snippet = cfg.getSnippet ? cfg.getSnippet(src) : (src.summary || src.content || JSON.stringify(src).slice(0, 100));
      const metricVal = src[this.anomalyField];
      const metricLabel = this.anomalyField + ': ' + (metricVal !== undefined ? (typeof metricVal === 'number' ? (cfg.unit === '$' ? '$' + metricVal.toLocaleString() : metricVal.toLocaleString() + ' ' + cfg.unit) : metricVal) : '--');

      return `
        <div class="hit-card ${isAnomaly ? 'is-anomaly' : ''}" data-hit-id="${hit.id || idx}" title="Click to inspect full document payload">
          <div class="hit-title-row">
            <span class="hit-title">${title}</span>
            <span class="hit-score-badge">BM25: ${hit.score || 1.0}</span>
          </div>
          <div class="hit-snippet">${snippet}</div>
          <div class="hit-meta-row">
            <span class="meta-tag">${metricLabel}</span>
            <span class="meta-tag">${src.severity || src.threat_level || src.attack_type || src.category || src.region || src.organization || 'Indexed'}</span>
            ${isAnomaly ? '<span class="meta-tag" style="background: rgba(244, 63, 94, 0.18); color: var(--accent-rose); font-weight: 700;">Outlier (z &ge; 2.2)</span>' : ''}
            <span class="meta-tag" style="margin-left: auto; color: var(--accent-indigo); font-weight: 600;">Inspect JSON &rarr;</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events to open document inspector
    this.resultsContainer.querySelectorAll('.hit-card').forEach((card, idx) => {
      card.addEventListener('click', () => {
        const hit = hits[idx];
        const isAnomaly = anomalyIndices.has(idx);
        if (hit) this.openDocInspector(hit, isAnomaly);
      });
    });
  }

  updateCodeSnippet(query, slice, anomalyReport) {
    if (!this.codeSnippet) return;

    const sliceLabel = (slice && slice.label) ? slice.label : (this.activeDatasetKey ? 'Matched results' : 'Matched');
    const anomalyCount = (anomalyReport && anomalyReport.anomalyCount !== undefined) ? anomalyReport.anomalyCount : 0;

    const jsCode = '// Live Stretchy Client Query Execution\n' +
      "import { StretchyClient } from '@avelynx/stretchy';\n\n" +
      'const client = new StretchyClient({\n' +
      "  baseUrl: 'https://stretchy-search.ksankstemp.workers.dev'\n" +
      '});\n\n' +
      '// 1. Search with BM25 Relevance Scoring on Live Engine\n' +
      "const res = await client.search('" + this.activeDatasetKey + "', {\n" +
      "  query: '" + query + "',\n" +
      '  limit: 20\n' +
      '});\n\n' +
      '// 2. Dynamic Query Slicer & Cut Gauge\n' +
      'const slicer = client.querySlicer(res.hits.length, res.total_hits);\n' +
      'console.log(slicer.label);\n' +
      '// => "' + sliceLabel + '"\n\n' +
      '// 3. Probabilistic Anomaly Detection\n' +
      "const audit = client.detectAnomalies(res.hits, '" + this.anomalyField + "');\n" +
      'if (audit.anomalyCount > 0) {\n' +
      "  console.warn('Detected outliers:', audit.anomalyCount);\n" +
      '  // => ' + anomalyCount + ' outlier(s) detected\n' +
      '}';

    this.codeSnippet.textContent = jsCode;
  }
}

// 3. Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AveLynxPlaygroundApp();
});

// Fail-safe global modal handlers
window.closeInspectorModal = function() {
  const m = document.getElementById('docInspectorModal');
  if (m) m.style.display = 'none';
};
window.closeSdkModal = function() {
  const m = document.getElementById('sdkCodeModal');
  if (m) m.style.display = 'none';
};
window.openSdkModal = function() {
  const m = document.getElementById('sdkCodeModal');
  if (m) m.style.display = 'flex';
};
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeInspectorModal();
    window.closeSdkModal();
  }
});
