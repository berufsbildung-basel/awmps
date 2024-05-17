import requests, json, time, os
from crontab import CronTab
from dotenv import load_dotenv

load_dotenv()

RULES_ENDPOINT = os.getenv('rules_url')

def get_rules():
    rules_list = []
    response = requests.get(RULES_ENDPOINT)
    data = response.json()

    if response.status_code != 200:
        return rules_list

    for rule in data:
        rules_list.append(rule)

    return rules_list


def send_approval(rule_id):
    print(f"approval sent for: {rule_id}")

def send_denial(rule_id):
    print(f"denial sent for: {rule_id}")


#TODO: remove unnecessary code + simulated "current_" data, rewrite the if statements in a shorter - better way
def rules(rule_lists):
    rule_list = json.loads(rule_lists)

    while True:
        for rule in rule_list:
            rules_id = rule.get('rules_id')

            #may be unnecessary here
            pot_id = rule.get('pot_id')
            zone_id = rule.get('zone_id')
            duration = rule.get('duration')
            action = rule.get('action')
            schedule = rule.get('schedule')
            enabled = rule.get('enabled')

            rain_probability_min = rule.get('rain_probability_min')
            rain_probability_max = rule.get('rain_probability_max')
            humidity_min = rule.get('humidity_min')
            humidity_max = rule.get('humidity_max')
            lux_min = rule.get('lux_min')
            lux_max = rule.get('lux_max')
            

            current_humidity = 30
            current_rain_probability = 20
            current_lux = 200

            if current_humidity > humidity_max:
                send_denial(rules_id)
            elif current_humidity < humidity_max:
                if current_humidity < humidity_min:
                    send_denial(rules_id)
                elif current_humidity > humidity_min:
                    print("humidity ok") # delete maybe?
                    if current_rain_probability > rain_probability_max:
                        send_denial(rules_id)
                    elif current_rain_probability < rain_probability_max:
                        if current_rain_probability < rain_probability_min:
                            send_denial(rules_id)
                        elif current_rain_probability > rain_probability_min:
                            print("rain probability ok") # delete maybe?
                            if current_lux > lux_max:
                                send_denial(rules_id)
                            elif current_lux < lux_max:
                                if current_lux < lux_min:
                                    send_denial(rules_id)
                                elif current_lux > lux_min:
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