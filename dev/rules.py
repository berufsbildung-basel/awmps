import requests, json, time, os
from crontab import CronTab
from dotenv import load_dotenv

load_dotenv()

RULES_ENDPOINT = os.getenv('rules_url')
QUERY_ENDPOINT = os.getenv('query_url')

def get_rules():
    rules_list = []
    response = requests.get(RULES_ENDPOINT)
    data = response.json()

    if response.status_code != 200:
        return rules_list

    for rule in data:
        rules_list.append(rule)

    return rules_list


def get_current_data():
    response = requests.get()

def send_approval(rule_id):
    print(f"approval sent for: {rule_id}")


def send_denial(rule_id):
    print(f"denial sent for: {rule_id}")


def rules(rule_lists):
    rule_list = json.loads(rule_lists)

    while True:
        for rule in rule_list:
            rules_id = rule.get('rules_id')

            rain_probability_min = rule.get('rain_probability_min')
            rain_probability_max = rule.get('rain_probability_max')
            humidity_min = rule.get('humidity_min')
            humidity_max = rule.get('humidity_max')
            lux_min = rule.get('lux_min')
            lux_max = rule.get('lux_max')
            
            current_humidity = 30
            current_rain_probability = 20
            current_lux = 200


            if not (humidity_min <= current_humidity <= humidity_max):
                send_denial(rules_id)
                continue

            if not (rain_probability_min <= current_rain_probability <= rain_probability_max):
                send_denial(rules_id)
                continue

            if not (lux_min <= current_lux <= lux_max):
                send_denial(rules_id)
                continue

            send_approval(rules_id)

        time.sleep(3)


def rule_handler(rules_list):
    try:
        rules_list = json.dumps(rules_list)
        rules(rules_list)

    except ValueError:
            print("DecodeValueError")


def main():
    rules_list = get_rules()
    rule_handler(rules_list)


if __name__ == "__main__":
    main()