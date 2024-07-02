import os, pandas
from influxdb_client_3 import InfluxDBClient3, Point
from dotenv import load_dotenv

load_dotenv()

INFLUX_TOKEN = os.getenv('token')
INFLUX_ORG = os.getenv('org')
INFLUX_HOST = os.getenv('host')
INFLUX_DATABASE = os.getenv('database')
INFLUX_MEASUREMENT = os.getenv('measurement')
INFLUX_CLIENT = InfluxDBClient3(host = INFLUX_HOST, token = INFLUX_TOKEN, org = INFLUX_ORG, database = INFLUX_DATABASE, verify_ssl = False)

class Query():
    @staticmethod
    def query():
        query = F"""
        SELECT *
        FROM '{INFLUX_MEASUREMENT}'
        WHERE
        time >= now() - interval '10 minutes'
        AND
        ("value" IS NOT NULL)
        ORDER BY time DESC
        LIMIT 14
        """

        table = INFLUX_CLIENT.query(query = query)
        df = table.to_pandas().sort_values(by="time")
        
        return df