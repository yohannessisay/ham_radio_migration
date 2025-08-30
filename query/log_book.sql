-- LogBook (high-level log entries)
CREATE TABLE LogBook (
    id TEXT PRIMARY KEY,
    uid TEXT REFERENCES UserProfile(id),       -- links to user
    name TEXT,
    coordinates JSONB,
    timestamp BIGINT,
    lastContactTimestamp BIGINT,
    contactCount INTEGER,
    myRadio TEXT,
    myAntenna TEXT
);