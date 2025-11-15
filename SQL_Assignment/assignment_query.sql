WITH last_60 AS (
    SELECT 
        a.id AS account_id,
        COUNT(ue.id) AS last_60_events
    FROM accounts a
    JOIN users u ON u.account_id = a.id
    JOIN usage_events ue ON ue.user_id = u.id
    WHERE date(ue.event_time) >= date('2024-08-01')
    GROUP BY a.id
),
prev_60 AS (
    SELECT 
        a.id AS account_id,
        COUNT(ue.id) AS prev_60_events
    FROM accounts a
    JOIN users u ON u.account_id = a.id
    JOIN usage_events ue ON ue.user_id = u.id
    WHERE date(ue.event_time) >= date('2024-06-01')
      AND date(ue.event_time) < date('2024-08-01')
    GROUP BY a.id
),
combined AS (
    SELECT
        a.name AS account_name,
        COALESCE(l.last_60_events, 0) AS last_60_days,
        COALESCE(p.prev_60_events, 0) AS previous_60_days,
        CASE
            WHEN COALESCE(p.prev_60_events, 0) = 0 THEN NULL
            ELSE ROUND(
                (COALESCE(l.last_60_events,0) - COALESCE(p.prev_60_events,0)) * 100.0
                / p.prev_60_events, 2
            )
        END AS percent_change
    FROM accounts a
    LEFT JOIN last_60 l ON l.account_id = a.id
    LEFT JOIN prev_60 p ON p.account_id = a.id
)
SELECT *
FROM combined
ORDER BY 
    percent_change ASC,
    CASE WHEN percent_change IS NULL THEN 1 ELSE 0 END;
