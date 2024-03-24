def lambda_handler(event, context):
    event_input = f'ok {event['input']}'

    return {
        'event_input': event_input
    }