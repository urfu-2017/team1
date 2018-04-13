#!/usr/bin/env python3
# coding=utf-8
import json
import argparse
from http.client import HTTPResponse
from urllib.request import Request, urlopen
from collections import namedtuple
from typing import List

Credentials = namedtuple('Credentials', 'url token')


class User(namedtuple('User', 'name id')):
    def __hash__(self):
        return hash(self.name)

    def __eq__(self, other):
        return self.name == other.name


def _get_request(credentials, url, *, method='GET') -> Request:
    request = Request(credentials.url + url, method=method)
    request.add_header('Authorization', credentials.token)
    return request


def _get_hru_credentials(env_file_path: str) -> Credentials:
    with open(env_file_path) as env:
        fields = {k: v for k, v in map(lambda s: s.strip().split('='), env)}
    return Credentials(
        fields['HRUDB_URL'],
        fields['HRUDB_TOKEN'].encode()
    )


def _get_users_set(credentials: Credentials) -> List[User]:
    request = _get_request(credentials, 'usersIndex_/all')
    response: HTTPResponse = urlopen(request)
    users_list = json.loads(response.read())
    users_list = map(lambda u: json.loads(u).split('_', 1), reversed(users_list))
    return list({User(name, id) for name, id in users_list})


def _get_githubid(credentials, user_id) -> int:
    request = _get_request(credentials, f'user_{user_id}')
    response: HTTPResponse = urlopen(request)
    user = json.loads(response.read())
    return user['githubId']


def _delete(credentials, key) -> bool:
    request = _get_request(credentials, key, method='DELETE')
    return urlopen(request).read()


def _parse_args() -> str:
    argparser = argparse.ArgumentParser()
    argparser.add_argument('--env-path', type=str, default='.env', help='Путь до файла .env')
    return argparser.parse_args().env_path


if __name__ == '__main__':
    env_path = _parse_args()
    credentials = _get_hru_credentials(env_path)
    users = _get_users_set(credentials)
    for i, user in enumerate(users, start=1):
        print(f'{i}. {user.name}\t{user.id}')
    num = int(input('Введи номер: '))
    user = users[num - 1]

    try:
        githubid = _get_githubid(credentials, user.id)
    except Exception:
        print('GithubId не найден в базе')
    else:
        try:
            _delete(credentials, f'githubId_{githubid}')
        except Exception:
            print(f'Не получилось удалить GithubId {githubid} :(')
        else:
            print(f'GithubId {githubid} удалён')

    try:
        _delete(credentials, f'user_{user.id}')
    except Exception:
        print(f'Не получилось удалить {user.name} ({user.id}) :(')
    else:
        print(f'{user.name} ({user.id}) удалён')

    print('Ошибки могут означать, что объекта уже не было в базе...')
